import { ClientService } from "../../../services/ClientService";
import { ClientReservationsInput } from "../../../services/ClientServiceInterface";

export class GetClientReservations {
  constructor(protected readonly clientService = new ClientService()) {}

  async execute(clientData: ClientReservationsInput) {
    const reservations =
      await this.clientService.getClientReservations(clientData);

    return reservations;
  }
}
