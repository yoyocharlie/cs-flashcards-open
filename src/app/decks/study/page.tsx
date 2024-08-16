import { redirect } from "next/navigation";
import { FlashcardList } from "~/app/_components/flashcard-list";
import { StudySession } from "~/app/_components/study";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

type NewDeckPageProps = {
  searchParams: { deckId: string };
};

export default async function StudyPage({ searchParams }: NewDeckPageProps) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/");
  }
  const deckId = Number(searchParams.deckId);
  void api.deck.getDeckStats.prefetch({ id: deckId });
  void api.card.getCardsFromDeck.prefetch({ id: deckId });
  return (
    <HydrateClient>
      <main>
        <StudySession deckId={deckId} />
      </main>
    </HydrateClient>
  );
}
