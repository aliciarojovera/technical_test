import { GetClientInput } from "./GetClientInterface";
import { ClientService } from "../../../services/ClientService";

export class GetClient {
  constructor(protected readonly clientService = new ClientService()) {}

  async execute(clientData: GetClientInput) {
    const client = await this.clientService.findClient(clientData);
    return client;
  }
}
