"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";
import { createSafeActions } from "@/lib/createSafeActions";
import { DeleteBoard } from "./schema";
import { redirect } from "next/navigation";
import { createAuditLog } from "@/lib/createAuditLog";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { decreaseCountLimit } from "@/lib/orgLimit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const isPro = await checkSubscription();
  const { id } = data;

  let board;

  try {
    board = await prisma.board.delete({
      where: {
        id,
        orgId,
      },
    });

    if (!isPro) {
      await decreaseCountLimit();
    }

    await createAuditLog({
      entityTitle: board.title,
      entityId: board.id,
      entityType: ENTITY_TYPE.BOARD,
      action: ACTION.DELETE,
    });
  } catch (error) {
    return {
      error: "Failed to delete board",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeActions(DeleteBoard, handler);
