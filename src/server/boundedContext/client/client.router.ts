import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { ReservationFormat, ReservationStatus } from "@prisma/client";
import { createTRPCRouter, clientTRPCProcedure } from "@/server/trpc";
import { GetClient, GetClientReservations } from "./client.module";

// MARK: Instances
const getClient = new GetClient();
const getClientReservations = new GetClientReservations();
// MARK: DTOs
const getClientDTO = z.object({
  id: z.string().uuid(),
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
});
