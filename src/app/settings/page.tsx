import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { Settings } from "../_components/settings";

export default async function SettingsPage() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/");
    return;
  }
  return (
    <HydrateClient>
      <Settings profile={session.user} />
    </HydrateClient>
  );
}
