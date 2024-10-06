"use client";

import { createBoard } from "@/actions/createBoard";
import { useAction } from "@/hooks/useActions";

export default function OrganizationIdPage() {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log("Success", data);
    },
    onError: (error) => {
      console.log("Error!", error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({ title });
  };

  return (
    <div>
      <form action={onSubmit}>
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
        />
      </form>
    </div>
  );
}
