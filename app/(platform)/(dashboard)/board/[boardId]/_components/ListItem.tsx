"use client";

import { ListWithCards } from "@/types";
import ListHeader from "./ListHeader";
import { ElementRef, useRef, useState } from "react";
import { CardForm } from "./CardForm";
import { cn } from "@/lib/utils";
import CardItem from "./CardItem";
import { Draggable, Droppable } from "@hello-pangea/dnd";

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
    <Draggable
      draggableId={data.id}
      index={index}
    >
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2"
          >
            <ListHeader
              onAddCard={enableEditing}
              data={data}
            />
            <Droppable
              droppableId={data.id}
              type="card"
            >
              {(provided) => (
                <ol
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                    data.cards.length > 2 ? "mt-2" : "mt-0",
                  )}
                >
                  {data.cards.map((card, index) => (
                    <CardItem
                      index={index}
                      key={card.id}
                      card={card}
                    />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              listId={data.id}
              isEditing={isEditing}
              enableEditing={enableEditing}
              disableEditing={disableEditing}
              ref={textAreaRef}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
}
