"use client";

import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Deck } from "./deck";
import { useCreateDeck } from "../hooks/useCreateDeck";
import { api } from "~/trpc/react";
import React from "react";

export function Decks() {
  const [decks] = api.deck.getAll.useSuspenseQuery();
  const handleCreateDeck = useCreateDeck();

  return (
    <>
      <Card>
        <CardHeader className="justify-between md:flex-row">
          <div>
            <CardTitle className="text-xl">Flashcard Decks</CardTitle>
            <CardDescription>
              Manage your flashcard decks and view your progress.
            </CardDescription>
          </div>
          <Button
            onClick={handleCreateDeck}
            variant="secondary"
            className="hidden space-x-2 md:inline-flex"
          >
            <Plus size={16} />
            <span>Create New Deck</span>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Cards</TableHead>
                <TableHead>Known</TableHead>
                <TableHead className="hidden md:table-cell"></TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {decks && decks.length > 0 ? (
                decks.map((deck) => (
                  <React.Fragment key={deck.id}>
                    <Deck deck={deck} />
                  </React.Fragment>
                ))
              ) : (
                <TableRow>
                  <TableHead colSpan={5}>
                    <div className="py-4 text-center">No decks to display</div>
                  </TableHead>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Button
        onClick={handleCreateDeck}
        variant="secondary"
        className="fixed bottom-5 right-5 space-x-2 first-letter:inline-flex md:hidden"
      >
        <Plus size={16} />
        <span>Create New Deck</span>
      </Button>
    </>
  );
}
