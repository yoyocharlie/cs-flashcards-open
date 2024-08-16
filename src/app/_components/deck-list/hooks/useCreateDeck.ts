import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export function useCreateDeck() {
  const router = useRouter();
  const utils = api.useUtils();

  const createDeckMutation = api.deck.create.useMutation({
    onSuccess: async (deck) => {
      router.push(`/decks/new-deck?deckId=${deck.id}`);
      await utils.deck.getAll.invalidate();
    },
    onError: (error) => {
      console.error("Error creating deck", error);
    },
  });

  const handleCreateDeck = async () => {
    try {
      await createDeckMutation.mutateAsync({ name: "New Deck" });
    } catch (error) {
      console.error("Error creating deck", error);
    }
  };

  return handleCreateDeck;
}
