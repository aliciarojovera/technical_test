import { createNextApiHandler } from "@trpc/server/adapters/next";
import { rootRouter, createTRPCContext } from "@/server";

export default createNextApiHandler({
  router: rootRouter,
  createContext: createTRPCContext,
  onError:
    process.env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : ({ error, path }) => {
          console.log(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
            error.name,
            error.code,
            error.stack,
            error.cause,
          );
          if (error.code === "INTERNAL_SERVER_ERROR") {
            error.message = "Something went wrong. Try again later";
          }
        },
});
