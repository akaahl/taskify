"use server";

import { auth } from "@clerk/nextjs/server";
import { InputType, ReturnType } from "./types";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";
import { createSafeActions } from "@/lib/createSafeActions";
import { UpdateListOrder } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { items, boardId } = data;

  let lists;

  try {
    const transaction = items.map((list) =>
      prisma.list.update({
        where: {
          id: list.id,
          board: {
            orgId,
          },
        },
        data: {
          order: list.order,
        },
      }),
    );

    lists = await prisma.$transaction(transaction);
  } catch (error) {
    return {
      error: "Failed to reorder list.",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return { data: lists };
};

export const updateListOrder = createSafeActions(UpdateListOrder, handler);
