import { createServerSideHelpers } from "@trpc/react-query/server";
import { Session } from "next-auth";
import superjson from "superjson";
import { rootRouter } from "@/server";

export const getServerSideAPI = (session: Session | null = null) =>
  createServerSideHelpers({
    router: rootRouter,
    transformer: superjson,
    ctx: {
      session,
    },
  });
