import { Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      name: string;
      email: string;
    };
    sessionError?: {
      code: TRPCError["code"];
      message: string;
    };
  }
}
