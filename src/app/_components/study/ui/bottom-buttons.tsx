"use client";

import React from "react";
import { Button } from "../../ui/button";
import { useStudySessionContext } from "~/app/_context/providers/study-session-provider";

export function BottomButtons() {
  const { isLastQuestion, isFirstQuestion, setCurrentIndex, setShowAnswer } =
    useStudySessionContext();
  return (
    <section>
      <div className="flex justify-between gap-3">
        <Button
          onClick={() => {
            setShowAnswer(false);
            setCurrentIndex((prev) => prev - 1);
          }}
          disabled={isFirstQuestion}
          variant="outline"
          className="flex-1"
        >
          Back
        </Button>
        {isLastQuestion ? (
          <Button
            onClick={() => {
              setShowAnswer(false);
              setCurrentIndex(0);
            }}
            className="flex-1"
          >
            Restart
          </Button>
        ) : (
          <Button
            onClick={() => {
              setShowAnswer(false);
              setCurrentIndex((prev) => prev + 1);
            }}
            className="flex-1"
          >
            Next
          </Button>
        )}
        {/* TODO:
          When we mark a card as isLearned, we invalidate the cards
          from the deck. This invalidation is effecting our shuffle
          because the shuffle is done client side, effectively resetting
          our shuffle state from the context
        */}
        {/* <Button
          onClick={shuffleFlashcards}
          variant="secondary"
          className="flex items-center gap-2"
        >
          <Shuffle size={16} />
        </Button> */}
      </div>
    </section>
  );
}
