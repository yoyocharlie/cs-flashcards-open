import { deckRouter } from "./routers/deck";
import { cardRouter } from "./routers/card";
import { userRouter } from "./routers/user";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  deck: deckRouter,
  card: cardRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.deck.all();
 *       ^? Deck[]
 */
export const createCaller = createCallerFactory(appRouter);
