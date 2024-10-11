"use client";

import { updateList } from "@/actions/updateList";
import { FormInput } from "@/components/form/FormInput";
import { useAction } from "@/hooks/useActions";
import { List } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
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

  const { execute } = useAction(updateList, {
    onSuccess: (result) => {
      toast.success(`Renamed to "${result.title}" successfully.`);
      setTitle(result.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  const handleBlur = () => {
    formRef.current?.requestSubmit();
  };

  const handleSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) {
      return disableEditing();
    }

    execute({ title, id, boardId });
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
          action={handleSubmit}
          ref={formRef}
          className="flex px-[2px] w-full"
        >
          <input
            hidden
            id="id"
            name="id"
            value={data.id}
            readOnly
          />
          <input
            hidden
            id="boardId"
            name="boardId"
            value={data.boardId}
            readOnly
          />
          <FormInput
            ref={inputRef}
            onBlur={handleBlur}
            id="title"
            placeholder="Enter a list title..."
            defaultValue={title}
            className="text-sm px-[7px] py-1 h-7 font-medium
            border-transparent hover:border-input focus:border-input 
            transition truncate bg-transparent focus:bg-white w-full"
          />
          <button
            type="submit"
            hidden
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
