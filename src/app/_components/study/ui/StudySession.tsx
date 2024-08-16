import React from "react";
import { DeckStats } from "./deck-stats";
import { Flashcards } from "./flashcards";
import { BottomButtons } from "./bottom-buttons";
import { StudySessionProvider } from "~/app/_context/providers/study-session-provider";

export type StudySessionProps = {
  deckId: number;
};

export function StudySession({ deckId }: StudySessionProps) {
  return (
    <StudySessionProvider deckId={deckId}>
      <section className="px-3 py-5 md:container">
        <div className="m-auto max-w-[800px] space-y-3">
          <DeckStats />
          <Flashcards />
          <BottomButtons />
        </div>
      </section>
    </StudySessionProvider>
  );
}
