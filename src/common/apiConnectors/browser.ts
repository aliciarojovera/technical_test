import { httpBatchLink, loggerLink, TRPCClientError } from "@trpc/client";
import { createTRPCNext } from "@trpc/next";
import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import superjson from "superjson";
import { type RootRouter } from "@/server";

type NestedFieldErrors<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof T]?: T[K] extends Record<string, any>
    ? NestedFieldErrors<T[K]>
    : string[];
};

type ErrorSetter = (fieldName: string, message: string) => void;

export function processFieldErrors<T>(
  fieldErrors: NestedFieldErrors<T>,
  setError: ErrorSetter,
): void {
  Object.entries(fieldErrors).forEach(([, value]) => {
    if (Array.isArray(value)) {
      processFieldErrors(value as string[][], setError);
    } else if (
      typeof value === "object" &&
      value !== null &&
      "path" in value &&
      "message" in value
    ) {
      setError(value.path as string, value.message as string);
    }
  });
}

function getBaseUrl() {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const api = createTRPCNext<RootRouter>({
  config() {
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === "development" ||
            (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
          transformer: superjson,
        }),
      ],
    };
  },
  transformer: superjson,
  ssr: false,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isTRPCClientError = <T extends Record<string, any>>(
  error: unknown,
): error is TRPCClientError<RootRouter> & {
  data: {
    zodError: {
      fieldErrors: NestedFieldErrors<T>;
    };
  };
} => {
  return error instanceof TRPCClientError;
};

export type RouterInputs = inferRouterInputs<RootRouter>;
export type RouterOutputs = inferRouterOutputs<RootRouter>;
