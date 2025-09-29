import { createTRPCRouter } from "@/server/trpc";
import { commonRouter } from "./common/common.router";
import { backOfficeRouter } from "./backOffice/backOffice.router";
import { clientRouter } from "./client/client.router";

export const rootRouter = createTRPCRouter({
  common: commonRouter,
  backOffice: backOfficeRouter,
  client: clientRouter,
});

export type RootRouter = typeof rootRouter;
