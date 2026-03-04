import { router } from "./_core/trpc";
import { leadsRouter } from "./leads/router";

export const appRouter = router({
  leads: leadsRouter,
});

export type AppRouter = typeof appRouter;
