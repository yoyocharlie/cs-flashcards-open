"use client";

import { notFound } from "next/navigation";
import React, { createContext, useContext, type ReactNode } from "react";
import {
  useStudySession,
  type UseStudySessionProps,
} from "~/app/_components/study/hooks/useStudySession";

type StudySessionContextType = ReturnType<typeof useStudySession>;

const StudySessionContext = createContext<StudySessionContextType | undefined>(
  undefined,
);

export function StudySessionProvider({
  children,
  deckId,
}: UseStudySessionProps & { children: ReactNode }) {
  const studySession = useStudySession({ deckId });

  console.log(studySession);

  if (studySession.flashcards === null) {
    notFound();
  }

  return (
    <StudySessionContext.Provider value={studySession}>
      {children}
    </StudySessionContext.Provider>
  );
}

export function useStudySessionContext() {
  const context = useContext(StudySessionContext);
  if (context === undefined) {
    throw new Error(
      "useStudySessionContext must be used within a StudySessionProvider",
    );
  }
  return context;
}
