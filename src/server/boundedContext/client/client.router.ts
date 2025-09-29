import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { ReservationFormat, ReservationStatus } from "@prisma/client";
import { createTRPCRouter, clientTRPCProcedure } from "@/server/trpc";
import {
  CreateClientReservation,
  GetClient,
  GetClientReservations,
} from "./client.module";

// MARK: Instances
const getClient = new GetClient();
const getClientReservations = new GetClientReservations();
const createClientReservation = new CreateClientReservation();

// MARK: DTOs
const getClientDTO = z.object({
  id: z.uuid(),
});

const getClientReservationsDTO = z.object({
  id: z.uuid(),
  itemsPerPage: z.number().min(1).max(100).optional().default(10),
  page: z.number().min(1).optional().default(1),
  name: z.string().optional().default(""),
  format: z.enum(ReservationFormat).optional(),
  status: z.enum(ReservationStatus).optional(),
  myReservationsOnly: z.boolean().optional().default(false),
  userId: z.uuid(),
});

export const createClientReservationDTO = z.object({
  id: z.uuid(),
  name: z.string().min(1).max(100),
  format: z.enum(ReservationFormat),
  pax: z.number().min(1).max(20),
  reservationDate: z.date(),
  userId: z.uuid(),
});

// MARK: Router
export const clientRouter = createTRPCRouter({
  getClient: clientTRPCProcedure
    .input(getClientDTO)
    .query(async ({ input, ctx }) => {
      if (ctx.session.user.id !== input.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "No tienes permiso para acceder a este cliente.",
        });
      }
      const client = await getClient.execute(input);
      return client;
    }),
  getClientReservations: clientTRPCProcedure
    .input(getClientReservationsDTO)
    .query(async ({ input, ctx }) => {
      if (ctx.session.user.id !== input.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "No tienes permiso para acceder a este cliente.",
        });
      }
      const reservations = await getClientReservations.execute(input);
      return reservations;
    }),
  createClientReservation: clientTRPCProcedure
    .input(createClientReservationDTO)
    .mutation(async ({ input, ctx }) => {
      if (ctx.session.user.id !== input.userId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "No tienes permiso para acceder to this client.",
        });
      }
      const reservation = await createClientReservation.execute(input);
      return reservation;
    }),
});
