"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { List } from "@prisma/client";
import { MoreHorizontal, X } from "lucide-react";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

export default function ListOptions({ onAddCard, data }: ListOptionsProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="h-auto w-auto p-2"
          variant="ghost"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="px-0 pt-3 pb-3"
        side="bottom"
        sideOffset={15}
        align="start"
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          List actions
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
        >
          Add a new card
        </Button>
      </PopoverContent>
    </Popover>
  );
}
