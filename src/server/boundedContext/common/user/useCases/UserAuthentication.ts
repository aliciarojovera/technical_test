import { TRPCError } from "@trpc/server";
import { compare } from "bcryptjs";
import { UserService } from "../services/UserService";

type UserCredentials = Record<"email" | "password", string> | undefined;

export class UserAuthentication {
  constructor(protected readonly userService = new UserService()) {}

  async execute(credentials: UserCredentials) {
    if (!credentials || !credentials.email || !credentials.password) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Email and password are required",
      });
    }

    const user = await this.userService.findUserByEmail({
      email: credentials.email,
    });

    if (!user || !(await compare(credentials.password, user.password))) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Incorrect email or password",
      });
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
}
