import { z } from "zod";
import { createTRPCRouter, backOfficeTRPCProcedure } from "@/server/trpc";
import { GetAllBackOfficeAdmins } from "./backOffice.module";

// MARK: Instances
const getAllBackOfficeAdmins = new GetAllBackOfficeAdmins();

// MARK: DTOs
const getAllBackOfficeAdminsDTO = z.object({
  name: z.string().optional(),
});

// MARK: Router
export const backOfficeRouter = createTRPCRouter({
  getAllBackOfficeAdmins: backOfficeTRPCProcedure
    .input(getAllBackOfficeAdminsDTO)
    .query(async ({ input }) => {
      const admins = await getAllBackOfficeAdmins.execute(input);
      return admins;
    }),
});
