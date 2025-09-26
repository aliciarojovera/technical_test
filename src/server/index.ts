import { rootRouter, RootRouter } from "./boundedContext/root.router";
import { authOptions, getServerAuthSession } from "./auth";
import { createTRPCContext } from "./trpc";

export { rootRouter, authOptions, createTRPCContext, getServerAuthSession };
export type { RootRouter };