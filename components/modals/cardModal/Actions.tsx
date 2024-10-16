"use client";

import { copyCard } from "@/actions/copyCard";
import { deleteCard } from "@/actions/deleteCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAction } from "@/hooks/useActions";
import { useCardModal } from "@/hooks/useCardModal";
import { CardWithList } from "@/types";
import { Copy, Delete } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

interface ActionsProps {
  data: CardWithList;
}

export const Actions = ({ data }: ActionsProps) => {
  const params = useParams();
  const boardId = params.boardId as string;
  const cardModal = useCardModal();

  const { execute: executeToCopy, isLoading: isLoadingCopy } = useAction(
    copyCard,
    {
      onSuccess: (result) => {
        toast.success(`Card "${result.title}" copied!`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    },
  );
  const { execute: executeToDelete, isLoading: isLoadingDelete } = useAction(
    deleteCard,
    {
      onSuccess: (result) => {
        toast.success(`Card "${result.title}" deleted!`);
        cardModal.onClose();
      },
      onError: (error) => {
        toast.error(error);
      },
    },
  );

  const onCopy = () => {
    executeToCopy({ id: data.id, boardId });
  };

  const onDelete = () => {
    executeToDelete({ id: data.id, boardId });
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-sm font-semibold">Actions</p>
      <Button
        variant="gray"
        size="inline"
        className="w-full"
        onClick={onCopy}
        disabled={isLoadingCopy}
      >
        <Copy className="h-3 w-3 mr-2" />
        Copy
      </Button>
      <Button
        variant="gray"
        size="inline"
        className="w-full"
        onClick={onDelete}
        disabled={isLoadingDelete}
      >
        Delete
      </Button>
    </div>
  );
};

Actions.Skeleton = function ActionsSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
