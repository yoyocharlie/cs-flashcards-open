import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import type { Deck, DeckName, DeckPoster } from "~/types";

export const deckRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }): Promise<DeckPoster[]> => {
    return await ctx.db.deck.findMany({
      select: {
        id: true,
        name: true,
        learnedCards: true,
        _count: {
          select: { cards: true },
        },
      },
      where: { userId: ctx.session.user.id },
    });
  }),

  getDeck: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }): Promise<Deck | null> => {
      return await ctx.db.deck.findUnique({
        where: { id: input.id },
        select: { id: true, cards: true, name: true },
      });
    }),

  getDeckStats: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }): Promise<DeckPoster | null> => {
      return await ctx.db.deck.findUnique({
        select: {
          id: true,
          name: true,
          learnedCards: true,
          _count: {
            select: { cards: true },
          },
        },
        where: {
          id: input.id,
        },
      });
    }),

  getDeckName: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }): Promise<DeckName | null> => {
      return await ctx.db.deck.findUnique({
        where: {
          id: input.id,
        },
        select: { name: true },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.deck.create({
        data: {
          name: input.name,
          user: { connect: { id: ctx.session.user.id } },
          learnedCards: 0,
        },
      });
    }),

  updateDeckName: protectedProcedure
    .input(z.object({ name: z.string(), id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.deck.update({
        data: {
          name: input.name,
        },
        where: {
          id: input.id,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.deck.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
