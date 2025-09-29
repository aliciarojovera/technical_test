import { Prisma } from "@prisma/client";
import { prismaSingleton } from "@/server/boundedContext";
import { ClientInput, ClientReservationsInput } from "./ClientServiceInterface";

export class ClientService {
  constructor(protected readonly prisma = prismaSingleton) {}

  async findClient(clientData: ClientInput) {
    const client = await this.prisma.client.findFirst({
      where: {
        User: {
          some: {
            id: clientData.id, // id del user
          },
        },
      },
      select: {
        id: true,
        name: true,
        phone: true,
        city: true,
        address: true,
        User: {
          select: {
            id: true,
            email: true,
            image: true,
            createdAt: true,
          },
        },
      },
    });
    return client;
  }

  async getClientReservations(clientData: ClientReservationsInput) {
    const whereClientClause: Prisma.ReservationWhereInput = {
      clientId: clientData.id,
      // filtro por nombre de reserva
      ...(clientData.name
        ? {
            reservationName: {
              contains: clientData.name,
              mode: "insensitive",
            },
          }
        : {}),
      // filtro por formato
      ...(clientData.format
        ? { format: clientData.format as "SEATED" | "COCKTAIL" }
        : {}),
      ...(clientData.status ? { reservationStatus: clientData.status } : {}),
      ...(clientData.myReservationsOnly && clientData.userId
        ? { userId: clientData.userId }
        : {}),
    };

    // check if the user belongs to the client
    const client = await this.prisma.client.findFirst({
      where: {
        id: clientData.id,
        User: {
          some: {
            id: clientData.userId,
          },
        },
      },
    });
    if (!client) {
      throw new Error("No tienes permiso para acceder a este cliente.");
    }
    // add total count for pagination
    const totalCount = await this.prisma.reservation.count({
      where: whereClientClause,
    });
    if (totalCount === 0) return null;
    const reservations = await this.prisma.reservation.findMany({
      where: whereClientClause,
      take: clientData.itemsPerPage,
      skip: (clientData.page - 1) * clientData.itemsPerPage,
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        reservationDate: "desc",
      },
    });
    return { totalCount, reservations };
  }
}
