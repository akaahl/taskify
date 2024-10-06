import { XCircle } from "lucide-react";

interface FormErrorsProp {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export default function FormErrors({ id, errors }: FormErrorsProp) {
  if (!errors) return null;
  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="mt-2 text-rose-500"
    >
      {errors?.[id]?.map((error: string) => (
        <div
          key={id}
          className="flex items-center p-2 border border-rose-500 bg-rose-500/10 rounded-sm text-sm"
        >
          <XCircle className="h-4 w-4 mr-2" />
          {error}
        </div>
      ))}
    </div>
  );
}
