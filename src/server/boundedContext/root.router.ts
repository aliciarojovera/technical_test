import { createTRPCRouter } from "@/server/trpc";
import { commonRouter } from "./common/common.router";
import { backOfficeRouter } from "./backOffice/backOffice.router";

export const rootRouter = createTRPCRouter({
  common: commonRouter,
  backOffice: backOfficeRouter,
});

export type RootRouter = typeof rootRouter;
