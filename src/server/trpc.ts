import { initTRPC, TRPCError } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { ZodError, flattenError } from "zod";
import superjson from "superjson";
import { getServerAuthSession } from "@/server";

interface CreateInnerContextArgs {
  session?: Awaited<ReturnType<typeof getServerAuthSession>> | null;
}

export function createTRPCContextInner({ session }: CreateInnerContextArgs) {
  return {
    session: session ?? null,
  };
}

export const createTRPCContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  const session = await getServerAuthSession({ req, res });

  const contextInner = createTRPCContextInner({ session });

  return contextInner;
};

export type Context = ReturnType<typeof createTRPCContextInner>;

const trpc = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    const err = {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === "INTERNAL_SERVER_ERROR" &&
          process.env.NODE_ENV === "production"
            ? "Internal server error"
            : error.cause instanceof ZodError
              ? flattenError(error.cause).fieldErrors
              : null,
      },
    };

    return err;
  },
});

export const createTRPCRouter = trpc.router;

export const publicTRPCProcedure = trpc.procedure;

export const protectedTRPCProcedure = trpc.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not logged in",
    });
  }
  if (ctx.session.sessionError) {
    throw new TRPCError({ ...ctx.session.sessionError });
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const backOfficeTRPCProcedure = trpc.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not logged in",
    });
  }
  if (ctx.session.sessionError) {
    throw new TRPCError({ ...ctx.session.sessionError });
  }
  if (ctx.session.user.role !== "ADMIN") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Only Administrators can access this route",
    });
  }
  return next({
    ctx: {
      ...ctx,
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const clientTRPCProcedure = trpc.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You are not logged in",
    });
  }
  if (ctx.session.sessionError) {
    throw new TRPCError({ ...ctx.session.sessionError });
  }
  if (ctx.session.user.role !== "CLIENT") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Only Clients can access this route",
    });
  }
  // tbd: añadir el check de que el user pertenece al cliente
  return next({
    ctx: {
      ...ctx,
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
