import { Prisma, Role } from "@prisma/client";
import { prismaSingleton } from "@/server/boundedContext";
import { FindAllBackOfficeAdminsInput } from "./BackOfficeAdminServiceInterface";

export class BackOfficeAdminsService {
  constructor(protected readonly prisma = prismaSingleton) {}

  async findAllBackOfficeAdmins(adminData: FindAllBackOfficeAdminsInput) {
    const whereAdminClause: Prisma.UserWhereInput = {
      name: {
        contains: adminData.name,
        mode: "insensitive",
      },
      role: Role.ADMIN,
    };

    const admins = await this.prisma.user.findMany({
      select: {
        id: true,
        role: true,
        name: true,
        email: true,
        image: true,
      },
      orderBy: [{ createdAt: "desc" }],
      where: whereAdminClause,
    });

    return admins;
  }
}
