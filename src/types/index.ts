import { z } from "zod";

/* Schemas */

export const deckPosterSchema = z.object({
  id: z.number(),
  name: z.string(),
  _count: z.object({
    cards: z.number(),
  }),
  learnedCards: z.number(),
});

export const cardSchema = z.object({
  id: z.number(),
  question: z.string(),
  answer: z.string(),
});

export const deckSchema = z.object({
  id: z.number(),
  name: z.string(),
  cards: z.array(cardSchema),
});

export const createDeckFormSchema = z.object({
  name: z.string().min(3, "Minimum of 3 characters required."),
  cards: z.array(cardSchema),
});

/* Inferred Types */

export type DeckPoster = z.infer<typeof deckPosterSchema>;
export type Deck = z.infer<typeof deckSchema>;
export type Card = z.infer<typeof cardSchema>;

/* Picks */

export type DeckName = Pick<Deck, "name">;
