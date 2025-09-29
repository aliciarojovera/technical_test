import { CreateClientReservationInput } from "./CreateClientReservationInput";
import { ClientService } from "../../../services/ClientService";

export class CreateClientReservation {
  constructor(protected readonly clientService = new ClientService()) {}

  async execute(reservationData: CreateClientReservationInput) {
    const reservation =
      await this.clientService.createClientReservation(reservationData);
    return reservation;
  }
}
