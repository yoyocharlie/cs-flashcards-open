import { useEffect, useState } from "react";
import { api } from "~/trpc/react";

export type UseStudySessionProps = {
  deckId: number;
};

export function useStudySession({ deckId }: UseStudySessionProps) {
  const [progress, setProgress] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const [isLastQuestion, setIsLastQuestion] = useState(false);

  const utils = api.useUtils();

  const [deckStats] = api.deck.getDeckStats.useSuspenseQuery({ id: deckId });
  const [flashcards] = api.card.getCardsFromDeck.useSuspenseQuery({
    id: deckId,
  });

  const [isLearned, setIsLearned] = useState(
    flashcards?.cards[currentIndex]?.isLearned,
  );

  const [currentContent, setCurrentContent] = useState<string | undefined>(
    flashcards?.cards[currentIndex]?.question,
  );

  useEffect(() => {
    if (flashcards?.cards[currentIndex]) {
      const content = showAnswer
        ? flashcards.cards[currentIndex].answer
        : flashcards.cards[currentIndex].question;
      setCurrentContent(content);

      const totalCards = deckStats?._count.cards ?? 0;
      const isLast = currentIndex === totalCards - 1;
      const isFirst = currentIndex === 0;

      const newProgress = isLast
        ? 100
        : ((currentIndex + 1) / totalCards) * 100;

      setProgress(newProgress);
      setIsFirstQuestion(isFirst);
      setIsLastQuestion(isLast);
    }
  }, [currentIndex, deckStats, showAnswer, flashcards]);

  useEffect(() => {
    setIsLearned(flashcards?.cards[currentIndex]?.isLearned);
  }, [currentIndex, flashcards?.cards]);

  const markAsLearned = api.card.markAsLearned.useMutation({
    onMutate: async ({ id }) => {
      await utils.deck.getDeckStats.cancel({ id: deckId });

      const previousDeckStats = utils.deck.getDeckStats.getData({ id: deckId });

      utils.deck.getDeckStats.setData({ id: deckId }, (oldStats) => {
        if (!oldStats) return oldStats;

        const card = flashcards?.cards.find((card) => card.id === id);
        if (!card) return oldStats;

        setIsLearned(!card.isLearned);

        return {
          ...oldStats,
          learnedCards: card.isLearned
            ? oldStats.learnedCards - 1
            : oldStats.learnedCards + 1,
        };
      });

      return { previousDeckStats };
    },
    onError: (err, variables, context) => {
      if (context?.previousDeckStats) {
        utils.deck.getDeckStats.setData(
          { id: deckId },
          context.previousDeckStats,
        );
      }

      setIsLearned(flashcards?.cards[currentIndex]?.isLearned);
    },
    onSettled: async () => {
      await utils.deck.getDeckStats.invalidate({ id: deckId });
      await utils.card.getCardsFromDeck.invalidate({ id: deckId });
      await utils.deck.getAll.invalidate();
    },
  });

  function onMarkAsLearned() {
    const card = flashcards?.cards[currentIndex];
    if (!card) return;

    markAsLearned.mutate({ id: card.id });
  }

  return {
    onMarkAsLearned,
    setCurrentIndex,
    setShowAnswer,
    currentIndex,
    progress,
    showAnswer,
    currentContent,
    flashcards,
    deckStats,
    isFirstQuestion,
    isLastQuestion,
    isLearned,
  };
}
