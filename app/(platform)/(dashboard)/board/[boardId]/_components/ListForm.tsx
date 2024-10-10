"use client";

import { Plus, X } from "lucide-react";
import ListWrapper from "./ListWrapper";
import { ElementRef, useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { Input } from "@/components/ui/input";
import { FormInput } from "@/components/form/FormInput";
import { useParams, useRouter } from "next/navigation";
import FormSubmit from "@/components/form/FormSubmit";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useActions";
import { createList } from "@/actions/createList";
import { toast } from "sonner";

export default function ListForm() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);
  const params = useParams();
  const router = useRouter();

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (result) => {
      toast.success(`List "${result.title}" created!`);
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const boardId = formData.get("boardId") as string;

    execute({ title, boardId });
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md"
        >
          <FormInput
            ref={inputRef}
            id="title"
            className="text-sm px-2 py-1 h-7 font-medium border-transparent
            hover:border-input focus:border-input transition"
            placeholder="Enter a list title..."
            errors={fieldErrors}
          />
          <input
            hidden
            value={params.boardId}
            name="boardId"
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add list</FormSubmit>
            <Button
              onClick={disableEditing}
              size="sm"
              variant="ghost"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        type="button"
        className="w-full rounded-md bg-white/80 hover:bg-white/50
        transition p-3 flex items-center font-medium text-sm"
        onClick={enableEditing}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add a list
      </button>
    </ListWrapper>
  );
}
