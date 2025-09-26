import { createTRPCRouter } from "@/server/trpc";
import { userRouter } from "./user/user.router";

export const commonRouter = createTRPCRouter({
  user: userRouter,
});
