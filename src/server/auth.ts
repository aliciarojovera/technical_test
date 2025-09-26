import { GetServerSidePropsContext } from "next";
import { TRPCError } from "@trpc/server";
import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Adapter } from "next-auth/adapters";
import { getServerSideAPI } from "@/common/apiConnectors/server";
import { prismaSingleton } from "@/server/boundedContext";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaSingleton) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const serverSideAPI = getServerSideAPI();

        try {
          const { user } =
            await serverSideAPI.common.user.userAuthentication.fetch(
              credentials,
            );

          if (!user) return null;

          return user;
        } catch (error) {
          if (error instanceof TRPCError) {
            if (error.code === "INTERNAL_SERVER_ERROR") {
              throw new Error("Something went wrong, please try again");
            }
            throw error;
          }
          throw new Error("Something went wrong, please try again");
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    session: async ({ session }) => {
      try {
        const serverSideAPI = getServerSideAPI(session);
        const data = await serverSideAPI.common.user.getSessionFields.fetch({
          email: session.user.email,
        });
        if (session.user && data?.id && data?.role) {
          session.user.id = data.id;
          session.user.role = data.role;
        }

        return session;
      } catch (error) {
        console.error(error, "error");
        if (error instanceof Error) {
          return {
            ...session,
            sessionError: {
              code: "INTERNAL_SERVER_ERROR",
              message:
                process.env.NODE_ENV === "development"
                  ? error.message
                  : "Something went wrong, please try again",
            },
          };
        }
        return session;
      }
    },
  },
  debug: process.env.NODE_ENV !== "production",
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
