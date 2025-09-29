import { ReservationFormat } from "@prisma/client";

export interface CreateClientReservationInput {
  id: string;
  name: string;
  format: ReservationFormat;
  userId: string;
  pax: number;
  reservationDate: Date;
}
