"use client";

import { FormInput } from "@/components/form/FormInput";
import { List } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface ListHeaderProps {
  data: List;
}

export default function ListHeader({ data }: ListHeaderProps) {
  const [title, setTitle] = useState<string>(data.title);
  const [isEditing, setIsEditing] = useState<boolean>(true);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  return (
    <div
      className="pt-2 px-2 text-sm font-semibold flex justify-between
      items-start gap-x-2"
    >
      {isEditing ? (
        <form
          action=""
          className="flex px-[2px] w-full"
        >
          <input
            hidden
            id={data.id}
            name={data.id}
            value={data.id}
          />
          <input
            hidden
            id={data.boardId}
            name={data.boardId}
            value={data.boardId}
          />
          <FormInput
            ref={inputRef}
            onBlur={() => disableEditing()}
            id={title}
            placeholder="Enter a list title..."
            defaultValue={title}
            className="text-sm px-[7px] py-1 h-7 font-medium
            border-transparent hover:border-input focus:border-input 
            transition truncate bg-transparent focus:bg-white w-full"
          />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-7 font-medium 
          border-transparent"
        >
          {title}
        </div>
      )}
    </div>
  );
}
