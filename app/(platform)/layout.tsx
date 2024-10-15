import { ModalProvider } from "@/components/providers/ModalProviders";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl={"/"}>
      <Toaster />
      <ModalProvider />
      {children}
    </ClerkProvider>
  );
}
