import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";

export function useFlashcard() {
  const queryParams = useSearchParams();
  const deckId = queryParams.get("deckId");
  const util = api.useUtils();

  const { mutate: deleteFlashcard, isPending: pendingDelete } =
    api.card.delete.useMutation({
      onSuccess: onDeleteSuccess,
    });

  function onDelete(id: number) {
    deleteFlashcard({ id });
  }

  async function onDeleteSuccess() {
    await util.deck.getDeck.invalidate({ id: Number(deckId) });
  }

  return {
    onDelete,
    pendingDelete,
  };
}
