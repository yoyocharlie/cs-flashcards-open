import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const cardRouter = createTRPCRouter({
  getCardsFromDeck: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      return await ctx.db.deck.findUnique({
        where: {
          id: input.id,
        },
        select: {
          cards: {
            orderBy: {
              id: "asc",
            },
          },
          _count: { select: { cards: true } },
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        question: z.string(),
        answer: z.string(),
        deckId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.card.create({
        data: { ...input, isLearned: false },
      });
    }),

  markAsLearned: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const existingCard = await ctx.db.card.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!existingCard) {
        throw new Error("Card not found");
      }

      let card;
      if (existingCard.isLearned) {
        card = await ctx.db.card.update({
          data: { isLearned: false },
          where: { id: input.id },
        });

        await ctx.db.deck.update({
          where: { id: card.deckId },
          data: {
            learnedCards: {
              decrement: 1,
            },
          },
        });
      } else {
        card = await ctx.db.card.update({
          data: { isLearned: true },
          where: { id: input.id },
        });

        await ctx.db.deck.update({
          where: { id: card.deckId },
          data: {
            learnedCards: {
              increment: 1,
            },
          },
        });
      }

      return card;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const card = await ctx.db.card.delete({
        where: {
          id: input.id,
        },
      });

      if (card.isLearned) {
        await ctx.db.deck.update({
          where: { id: card.deckId },
          data: {
            learnedCards: {
              decrement: 1,
            },
          },
        });
      }

      return card;
    }),
});
