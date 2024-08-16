import { HydrateClient } from "~/trpc/server";
import { Hero } from "./_components/hero";
import { Highlights } from "./_components/highlights";
import { CTA } from "./_components/cta";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerAuthSession();
  if (session) {
    redirect("/decks");
    return;
  }

  return (
    <HydrateClient>
      <main className="flex flex-col items-center justify-center p-4">
        <Hero />
        <Highlights />
        <CTA />
      </main>
    </HydrateClient>
  );
}
