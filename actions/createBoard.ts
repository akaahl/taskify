"use server";

import prisma from "@/utils/db";
import { z } from "zod";

const CreateBoard = z.object({
  title: z.string(),
});

export async function createBoard(formData: FormData) {
  const { title } = CreateBoard.parse({
    title: formData.get("title"),
  });

  await prisma.board.create({
    data: {
      title,
    },
  });
}
