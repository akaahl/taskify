"use client";

import { useProModal } from "@/hooks/useProModal";
import { Dialog, DialogContent } from "../ui/dialog";
import Image from "next/image";
import Hero from "@/public/hero.svg";
import { Button } from "../ui/button";
import { useAction } from "@/hooks/useActions";
import { stripeRedirect } from "@/actions/stripeRedirect";
import { toast } from "sonner";

export default function ProModal() {
  const proModal = useProModal();

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    execute({});
  };

  return (
    <Dialog
      open={proModal.isOpen}
      onOpenChange={proModal.onClose}
    >
      <DialogContent className="max-w-md p-0 overflow-hidden gap-0">
        <div className="aspect-video relative flex items-center justify-center">
          <Image
            src={Hero}
            alt="hero"
            className="object-cover"
            fill
          />
        </div>
        <div className="text-neutral-700 mx-auto space-y-6 p-6 pb-7">
          <h2 className="font-semibold text-xl">Upgrade to Taskify Pro!</h2>
          <p className="font-semibold text-neutral-600">
            Explore the best of taskify!
          </p>
          <div className="pl-3">
            <ul className="list-disc text-sm">
              <li>Unlimited boards</li>
              <li>Advanced checklists</li>
              <li>Admin and security features</li>
              <li>And more!</li>
            </ul>
          </div>
          <Button
            className="w-full"
            disabled={isLoading}
            onClick={onClick}
          >
            Upgrade
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
