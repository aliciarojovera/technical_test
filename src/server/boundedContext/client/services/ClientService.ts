import { Prisma } from "@prisma/client";
import { prismaSingleton } from "@/server/boundedContext";
import {
  ClientInput,
  ClientReservationsInput,
  CreateClientReservationInput,
} from "./ClientServiceInterface";

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
      ...(clientData.name
        ? {
            reservationName: {
              contains: clientData.name,
              mode: "insensitive",
            },
          }
        : {}),
      ...(clientData.format ? { format: clientData.format } : {}),
      ...(clientData.status ? { reservationStatus: clientData.status } : {}),
      ...(clientData.myReservationsOnly && clientData.userId
        ? { userId: clientData.userId }
        : {}),
    };

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
  async createClientReservation(clientData: CreateClientReservationInput) {
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
    const newReservation = await this.prisma.reservation.create({
      data: {
        reservationName: clientData.name,
        pax: clientData.pax,
        reservationDate: clientData.reservationDate,
        format: clientData.format,
        reservationStatus: "INITIAL_STATUS",
        clientId: clientData.id,
        userId: clientData.userId!,
      },
    });
    return newReservation;
  }
}
