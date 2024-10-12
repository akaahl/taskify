"use client";

import FormSubmit from "@/components/form/FormSubmit";
import { FormTextArea } from "@/components/form/FormTextArea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { forwardRef } from "react";

interface CardFormProps {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
  ({ listId, isEditing, enableEditing, disableEditing }, ref) => {
    if (isEditing) {
      return (
        <form
          action=""
          className="m1 py-0.5 px-1 space-y-4"
        >
          <FormTextArea
            id="title"
            ref={ref}
            onKeyDown={() => {}}
            placeholder="Enter a title for this card"
          />
          <input
            hidden
            name="listId"
            id="listId"
            defaultValue={listId}
          />
          <div className="flex items-center gap-x-1">
            <FormSubmit>Add card</FormSubmit>
            <Button
              size="sm"
              variant="ghost"
              onClick={disableEditing}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      );
    }

    return (
      <div className="pt-2 px-2">
        <Button
          className="h-auto px-2 py-1.5 w-full justify-start 
          text-muted-foreground text-sm"
          size="sm"
          variant="ghost"
          onClick={enableEditing}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add a new card
        </Button>
      </div>
    );
  },
);

CardForm.displayName = "CardForm";
