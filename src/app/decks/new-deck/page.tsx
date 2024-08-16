import { FlashcardList } from "~/app/_components/flashcard-list";
import { api, HydrateClient } from "~/trpc/server";

type NewDeckPageProps = {
  searchParams: { deckId: string };
};

export default async function NewDeckPage({ searchParams }: NewDeckPageProps) {
  void api.deck.getDeck.prefetch({ id: Number(searchParams.deckId) });
  void api.deck.getDeckName.prefetch({ id: Number(searchParams.deckId) });
  return (
    <HydrateClient>
      <main>
        <FlashcardList />
      </main>
    </HydrateClient>
  );
}
