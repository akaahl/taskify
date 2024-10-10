"use client";

import { deleteBoard } from "@/actions/deleteBoard";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/useActions";
import { MoreHorizontal, X } from "lucide-react";

interface BoardOptionsProps {
  id: string;
}

export default function BoardOptions({ id }: BoardOptionsProps) {
  const { execute } = useAction(deleteBoard, {
    onSuccess: (result) => {
      console.log(result);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = () => {
    console.log(id);
    // execute({ id });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-auto w-auto p-2"
          variant="transparent"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 pt-3 pb-3 mr-2"
        side="bottom"
        align="start"
      >
        <div
          className="text-sm font-medium text-center text-neutral-600
        pb-4"
        >
          Board actions
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2
          text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit}>
          <Button
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start
            font-normal text-sm"
            onClick={onSubmit}
          >
            Delete this board
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
