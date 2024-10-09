import prisma from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { Board } from "@prisma/client";

interface BoardNavbarProps {
  data: Board;
}

export default async function BoardNavbar({ data }: BoardNavbarProps) {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-[4.5rem] flex items-center px-6 gap-x-4 text-white">
      <h1>This is board navbar</h1>
    </div>
  );
}
