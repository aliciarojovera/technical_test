import { z } from "zod";
import {
  createTRPCRouter,
  protectedTRPCProcedure,
  publicTRPCProcedure,
} from "@/server/trpc";
import { GetSessionFields, UserAuthentication } from "./user.module";

// MARK: Instances
const getSessionFields = new GetSessionFields();
const userAuthentication = new UserAuthentication();

// MARK: DTOs
const GetSessionFieldsDTO = z.object({
  email: z.string().email(),
});
const UserAuthenticationDTO = z
  .object({
    email: z.string().email(),
    password: z.string(),
  })
  .optional();

// MARK: Router
export const userRouter = createTRPCRouter({
  getSessionFields: protectedTRPCProcedure
    .input(GetSessionFieldsDTO)
    .query(async ({ input }) => {
      const fields = await getSessionFields.execute({ email: input.email });
      return fields;
    }),

  userAuthentication: publicTRPCProcedure
    .input(UserAuthenticationDTO)
    .query(async ({ input }) => {
      const user = await userAuthentication.execute(input);
      return {
        user,
      };
    }),
});
