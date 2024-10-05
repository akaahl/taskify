import { createBoard } from "@/actions/createBoard";

export default function OrganizationIdPage() {
  return (
    <div>
      <form action={createBoard}>
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
