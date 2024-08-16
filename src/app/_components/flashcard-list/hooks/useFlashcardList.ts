import { useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";

export default function useFlashcardList() {
  const queryParams = useSearchParams();
  const deckId = queryParams.get("deckId");
  const [deck] = api.deck.getDeck.useSuspenseQuery({ id: Number(deckId) });

  return deck?.cards ?? [];
}
