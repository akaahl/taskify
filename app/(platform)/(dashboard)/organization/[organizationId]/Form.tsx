"use client";

import { createBoard } from "@/actions/createBoard";
import { FormInput } from "@/components/form/FormInput";
import FormSubmit from "@/components/form/FormSubmit";
import { useAction } from "@/hooks/useActions";

export default function Form() {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log("Success", data);
    },
    onError: (error) => {
      console.error("Error!", error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title });
  };

  return (
    <form action={onSubmit}>
      <div className="flex flex-col space-y-2">
        <FormInput
          id="title"
          errors={fieldErrors}
          label="Board Title"
        />
      </div>
      <FormSubmit>Save</FormSubmit>
    </form>
  );
}
