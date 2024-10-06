"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface FormButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}

export default function FormSubmit({
  children,
  disabled,
  className,
  variant,
}: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={disabled || pending}
      className={cn(className)}
      variant={variant}
      type="submit"
    >
      {children}
    </Button>
  );
}
