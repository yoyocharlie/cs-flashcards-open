import { type ChangeEvent, useState } from "react";
import { api } from "~/trpc/react";

type UseDeckProps = {
  deckId: number;
};

export function useDeckName({ deckId }: UseDeckProps) {
  const util = api.useUtils();
  const [deck] = api.deck.getDeckName.useSuspenseQuery({ id: deckId });

  const [isEditingName, setIsEditingName] = useState(false);
  const [deckName, setDeckName] = useState(deck?.name ?? "");

  const updateDeckName = api.deck.updateDeckName.useMutation({
    onMutate: async (newData) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await util.deck.getDeckName.cancel();

      // Snapshot the previous value
      const previousDeck = util.deck.getDeckName.getData({ id: deckId });

      // Optimistically update to the new value
      util.deck.getDeckName.setData({ id: deckId }, (oldData) => {
        if (!oldData) return oldData; // In case oldData is undefined, avoid issues
        return {
          ...oldData,
          name: newData.name,
        };
      });

      // Return a context with the previous and new deck name
      return { previousDeck };
    },
    onError: (err, newData, context) => {
      // If the mutation fails, use the context we returned to roll back
      if (context?.previousDeck) {
        util.deck.getDeckName.setData({ id: deckId }, context.previousDeck);
      }
    },
    onSettled: async () => {
      // Always refetch after error or success to ensure data consistency
      await util.deck.getDeckName.invalidate({ id: deckId });
    },
  });

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDeckName(e.target.value);

  const handleNameSubmit = async () => {
    onUpdateName(deckName, deckId);
    setIsEditingName(false);
  };

  function onUpdateName(newName: string, deckId: number) {
    updateDeckName.mutate({ name: newName, id: deckId });
  }

  return {
    deck,
    deckName,
    isEditingName,
    setIsEditingName,
    handleNameChange,
    handleNameSubmit,
  };
}
