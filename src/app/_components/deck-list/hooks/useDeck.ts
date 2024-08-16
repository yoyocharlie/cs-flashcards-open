import { type ChangeEvent, useState } from "react";
import { api } from "~/trpc/react";

export function useDeck() {
  const util = api.useUtils();

  const deleteDeck = api.deck.delete.useMutation({
    onSuccess: async () => {
      await util.deck.getAll.invalidate();
    },
  });

  function onDelete(id: number) {
    deleteDeck.mutate({ id });
  }

  return {
    onDelete,
    pendingDelete: deleteDeck.isPending,
  };
}
