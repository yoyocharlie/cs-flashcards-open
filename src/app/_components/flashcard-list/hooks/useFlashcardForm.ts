import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

const flashcardSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
});

type FlashcardFormValues = z.infer<typeof flashcardSchema>;

export function useFlashcardForm(deckId: number) {
  const router = useRouter();
  const form = useForm<FlashcardFormValues>({
    resolver: zodResolver(flashcardSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const utils = api.useUtils();
  const addFlashcard = api.card.create.useMutation({
    onMutate: async (newFlashcard) => {
      await utils.deck.getDeck.cancel({ id: deckId });

      const previousDeck = utils.deck.getDeck.getData({
        id: newFlashcard.deckId,
      });

      utils.deck.getDeck.setData({ id: newFlashcard.deckId }, (deck) => {
        if (!deck) return deck;

        return {
          ...deck,
          cards: [
            ...deck.cards,
            {
              ...newFlashcard,
              id: Math.random(),
              isLearned: false,
            },
          ],
        };
      });

      return { previousDeck };
    },
    onError: (err, newFlashcard, context) => {
      if (context?.previousDeck) {
        utils.deck.getDeck.setData(
          { id: newFlashcard.deckId },
          context.previousDeck,
        );
      }
    },
    onSettled: async (data, error, variables) => {
      if (variables.deckId) {
        await utils.deck.getDeck.invalidate({ id: variables.deckId });
      }
    },
  });

  const onSubmit: SubmitHandler<FlashcardFormValues> = async (data) => {
    try {
      await addFlashcard.mutateAsync({
        question: data.question,
        answer: data.answer,
        deckId,
      });
      await utils.deck.getDeck.invalidate({ id: deckId });
      form.reset();
    } catch (error) {
      console.error("Error saving flashcard", error);
    }
  };

  const onDone = async () => {
    await utils.deck.getAll.invalidate();
    router.push("/decks");
  };

  return { form, onSubmit, onDone };
}
