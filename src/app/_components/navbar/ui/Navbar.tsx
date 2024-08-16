import { getServerAuthSession } from "~/server/auth";
import { NavbarClient } from "./navbar-client";

export async function Navbar() {
  const session = await getServerAuthSession();

  return <NavbarClient session={session} />;
}
