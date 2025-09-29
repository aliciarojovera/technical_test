import { ReservationFormat, ReservationStatus } from "@prisma/client";

export interface ClientInput {
  id: string;
}

export interface ClientReservationsInput {
  id: string;
  itemsPerPage: number;
  page: number;
  name: string;
  format?: ReservationFormat;
  status?: ReservationStatus;
  myReservationsOnly?: boolean;
  userId?: string;
}
