"use client";

import { ListWithCards } from "@/types";
import ListHeader from "./ListHeader";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./CardForm";

interface ListItemProps {
  data: ListWithCards;
  index: number;
}

export default function ListItem({ index, data }: ListItemProps) {
  const textAreaRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader
          onAddCard={enableEditing}
          data={data}
        />
        <CardForm
          listId={data.id}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
          ref={textAreaRef}
        />
      </div>
    </li>
  );
}
