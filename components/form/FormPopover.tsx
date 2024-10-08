"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { FormInput } from "./FormInput";
import FormSubmit from "./FormSubmit";
import { useAction } from "@/hooks/useActions";
import { createBoard } from "@/actions/createBoard";
import { StringValidation } from "zod";
import { toast } from "sonner";
import FormPicker from "./FormPicker";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export default function FormPopover({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}: FormPopoverProps) {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data);
      toast.success("Board created!");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const image = formData.get("image") as string;
    console.log({ image });
    execute({ title, image });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        sideOffset={sideOffset}
        side={side}
      >
        <div className="font-medium text-center text-neutral-600 pb-4">
          Create board
        </div>
        <PopoverClose>
          <Button
            className="h-auto w-auto p-2 absolute top-1 right-2 text-neutral-600"
            variant="ghost"
            asChild
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form
          action={onSubmit}
          className="space-y-3"
        >
          <div className="space-y-3">
            <FormPicker
              id="image"
              errors={fieldErrors}
            />
            <FormInput
              id="title"
              label="Board title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
}
