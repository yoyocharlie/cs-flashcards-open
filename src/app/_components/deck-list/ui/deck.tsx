"use client";

import type { DeckPoster } from "~/types";
import Link from "next/link";
import { Button } from "../../ui/button";
import { Book, Loader2, MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "../../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Badge } from "../../ui/badge";
import { useDeck } from "../hooks/useDeck";

type DeckProps = {
  deck: DeckPoster;
};

export function Deck({ deck }: DeckProps) {
  const { onDelete, pendingDelete } = useDeck();

  return (
    <TableRow className={`${pendingDelete ? "opacity-50" : ""}`}>
      <TableCell className="font-medium">{deck.name}</TableCell>
      <TableCell>{deck._count.cards}</TableCell>
      <TableCell>
        <Badge variant="outline">
          {deck.learnedCards}/{deck._count.cards}
        </Badge>
      </TableCell>
      <TableCell align="right" className="hidden md:table-cell">
        {deck._count.cards > 0 ? (
          <Link href={`/decks/study?deckId=${deck.id}`}>
            <Button size="sm" className="space-x-2" disabled={pendingDelete}>
              <Book size={18} />
              <span>Study</span>
            </Button>
          </Link>
        ) : (
          <Badge variant="secondary">No cards</Badge>
        )}
      </TableCell>
      <TableCell align="right">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              aria-haspopup="true"
              size="icon"
              variant="ghost"
              disabled={pendingDelete}
            >
              {pendingDelete ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MoreHorizontal className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {deck._count.cards > 0 && (
              <Link href={`/decks/study?deckId=${deck.id}`}>
                <DropdownMenuItem className="flex md:hidden">
                  Study
                </DropdownMenuItem>
              </Link>
            )}
            <Link href={`/decks/edit?deckId=${deck.id}`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => onDelete(deck.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
