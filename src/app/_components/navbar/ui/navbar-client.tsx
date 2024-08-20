"use client";

import type { Session } from "next-auth";
import Link from "next/link";
import { Logo } from "../../icons/logo";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { CircleUser } from "lucide-react";
import { Label } from "../../ui/label";
import { useScrollShadow } from "../hooks/useScrollShadow";
import { ModeToggle } from "./mode-toggle";

export function NavbarClient({ session }: { session: Session | null }) {
  const isScrolled = useScrollShadow();

  return (
    <nav
      className={`fixed top-0 z-40 w-full bg-background transition-shadow duration-500 ease-in-out ${isScrolled ? "shadow-md" : ""}`}
    >
      <div className="container flex justify-between py-5">
        <Link href={"/decks"}>
          <Logo />
        </Link>
        <div className="flex gap-4">
          <ModeToggle />
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="default" size="icon" className="rounded-full">
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="flex flex-col">
                  <Label>Signed in as:</Label>
                  <span className="text-muted-foreground">
                    {session?.user.email}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link href={"/decks"}>
                  <DropdownMenuItem className="cursor-pointer">
                    Decks
                  </DropdownMenuItem>
                </Link>
                <Link href={"/settings"}>
                  <DropdownMenuItem className="cursor-pointer">
                    Settings
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator />
                <Link href={"/api/auth/signout"}>
                  <DropdownMenuItem className="cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/api/auth/signin">
              <Button>Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
