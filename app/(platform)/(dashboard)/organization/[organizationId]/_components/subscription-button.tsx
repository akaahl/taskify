"use client";

import { stripeRedirect } from "@/actions/stripeRedirect";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useActions";
import { useProModal } from "@/hooks/useProModal";
import { toast } from "sonner";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export default function SubscriptionButton({ isPro }: SubscriptionButtonProps) {
  const proModal = useProModal();
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (result) => {
      window.location.href = result;
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onClick = () => {
    if (isPro) {
      execute({});
    } else {
      proModal.onOpen();
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={onClick}
    >
      {isPro ? "Manage your subscription" : "Upgrade to pro"}
    </Button>
  );
}
