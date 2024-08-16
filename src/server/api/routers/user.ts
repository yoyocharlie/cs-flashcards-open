import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  delete: protectedProcedure.mutation(({ ctx }) => {
    return ctx.db.user.delete({ where: { id: ctx.session.user.id } });
  }),
});
