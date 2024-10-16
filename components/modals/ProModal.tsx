"use client";

import { useProModal } from "@/hooks/useProModal";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import Hero from "@/public/hero.svg";

export default function ProModal() {
  const proModal = useProModal();

  return (
    <Dialog
      open={proModal.isOpen}
      onOpenChange={proModal.onClose}
    >
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="aspect-video relative flex items-center justify-center">
          <Image
            src={Hero}
            alt="hero"
            className="object-cover"
            fill
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
