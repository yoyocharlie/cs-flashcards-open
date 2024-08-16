import { FlashcardList } from "~/app/_components/flashcard-list";
import { api, HydrateClient } from "~/trpc/server";

type EditDeckPageProps = {
  searchParams: { deckId: string };
};

export default async function EditDeckPage({
  searchParams,
}: EditDeckPageProps) {
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
