import { Board } from "@prisma/client";
import BoardTitleForm from "./BoardTitleForm";

interface BoardNavbarProps {
  data: Board;
}

export default async function BoardNavbar({ data }: BoardNavbarProps) {
  return (
    <div className="w-full h-14 z-[40] bg-black/50 fixed top-[4.5rem] flex items-center px-6 gap-x-4 text-white">
      <BoardTitleForm data={data} />
    </div>
  );
}
