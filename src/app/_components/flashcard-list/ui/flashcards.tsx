"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import useFlashcardList from "../hooks/useFlashcardList";
import { Flashcard } from "./flashcard";
import { Suspicious } from "../../icons/suspicious";

export function Flashcards() {
  const flashcards = useFlashcardList();

  return (
    <Card>
      <CardHeader className="justify-between md:flex-row">
        <CardTitle className="text-xl">Flashcards</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <span className="sr-only">Question Number</span>
              </TableHead>
              <TableHead>Question</TableHead>
              <TableHead>Answer</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flashcards.length > 0 ? (
              flashcards.map((flashcard, i) => {
                return (
                  <Flashcard
                    key={flashcard.id}
                    flashcard={flashcard}
                    rowNumber={i + 1}
                  />
                );
              })
            ) : (
              <TableRow>
                <TableHead colSpan={4}>
                  <div className="space-y-3 py-4 text-center">
                    <span>There appears to be no flashcards yet.</span>
                    <Suspicious className="m-auto h-16" />
                  </div>
                </TableHead>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
