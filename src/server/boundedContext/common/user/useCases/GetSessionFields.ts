import { UserService } from "../services/UserService";

export class GetSessionFields {
  constructor(protected readonly userService = new UserService()) {}

  async execute({ email }: { email: string }) {
    const sessionFields = await this.userService.findSessionFieldsByEmail({
      email,
    });

    if (!sessionFields) {
      return null;
    }

    return sessionFields;
  }
}
