import { prismaSingleton } from "@/server/boundedContext";
import {
  FindSessionFieldsByEmailInterface,
  FindUserByEmailInterface,
} from "./UserServiceInterfaces";

export class UserService {
  constructor(protected readonly prisma = prismaSingleton) {}

  async findSessionFieldsByEmail(userData: FindSessionFieldsByEmailInterface) {
    const user = await this.prisma.user.findUnique({
      select: {
        id: true,
        role: true,
        email: true,
        image: true,
      },
      where: {
        email: userData.email,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async findUserByEmail(userData: FindUserByEmailInterface) {
    const user = await this.prisma.user.findFirst({
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
      where: {
        email: {
          equals: userData.email,
          mode: "insensitive",
        },
      },
    });

    if (!user) {
      return null;
    }

    return user;
  }
}
