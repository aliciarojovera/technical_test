import { ClientService } from "../../../services/ClientService";
import { ClientInput } from "../../../services/ClientServiceInterface";

export class GetClient {
  constructor(protected readonly clientService = new ClientService()) {}

  async execute(clientData: ClientInput) {
    const client = await this.clientService.findClient(clientData);
    return client;
  }
}
