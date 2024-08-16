import { api, HydrateClient } from "~/trpc/server";
import { DeckList } from "../_components/deck-list";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DecksPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/");
  }
  void api.deck.getAll.prefetch();

  return (
    <HydrateClient>
      <main>
        <DeckList />
      </main>
    </HydrateClient>
  );
}
