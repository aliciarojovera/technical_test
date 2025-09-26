import { GetAllBackOfficeAdminsInput } from "./GetAllBackOfficeAdminsInterface";
import { BackOfficeAdminsService } from "../../../services/BackOfficeAdminService/BackOfficeAdminService";

export class GetAllBackOfficeAdmins {
  constructor(
    protected readonly backOfficeAdminServices = new BackOfficeAdminsService(),
  ) {}

  async execute(backOfficeAdminData: GetAllBackOfficeAdminsInput) {
    const backOfficeAdmins =
      await this.backOfficeAdminServices.findAllBackOfficeAdmins(
        backOfficeAdminData,
      );

    return backOfficeAdmins;
  }
}
