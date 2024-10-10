"use client";

import { updateBoard } from "@/actions/updateBoard";
import { FormInput } from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useActions";
import { Board } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";

interface BoardTitleFormProps {
  data: Board;
}

export default function BoardTitleForm({ data }: BoardTitleFormProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const [title, setTitle] = useState(data.title);

  const { execute } = useAction(updateBoard, {
    onSuccess: (result) => {
      toast.success(`Board "${result.title}" updated!`);
      setTitle(result.title);
      disableEditing();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to update board title.");
    },
  });

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

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title, id: data.id });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        ref={formRef}
        className="flex items-center gap-x-2"
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none
          focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="font-bold text-lg h-auto w-auto p-1 px-2"
    >
      {title}
    </Button>
  );
}
