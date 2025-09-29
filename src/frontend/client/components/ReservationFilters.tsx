import {
  UseFormRegister,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { RouterInputs } from "@/common/apiConnectors/browser";
import { GeneralSwitch } from "@/frontend/common/UI/GeneralSwitch";
import { GeneralDropdown } from "@/frontend/common/UI/GeneralDropdown";
import { GeneralInput } from "@/frontend/common/UI/GeneralInput";
import { formatOptions, statusOptions } from "@/common/utils/constants";

type ReservationFiltersInputs = RouterInputs["client"]["getClientReservations"];
interface ReservationFiltersProps {
  register: UseFormRegister<ReservationFiltersInputs>;
  watch: UseFormWatch<ReservationFiltersInputs>;
  setValue: UseFormSetValue<ReservationFiltersInputs>;
}

export function ReservationFilters({
  register,
  watch,
  setValue,
}: ReservationFiltersProps) {
  return (
    <div className="mb-6 flex w-full flex-col gap-4 md:flex-row">
      <div className="w-full md:w-1/2 lg:w-1/4">
        <GeneralInput
          id="name"
          label="Buscar por nombre"
          type="text"
          placeholder="Holiday Party"
          register={register("name")}
          generalInputContainer="w-full"
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/4">
        <GeneralDropdown
          id="status"
          label="Filtrar por estado"
          placeholder="Todos"
          register={register("status")}
          options={statusOptions}
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/4">
        <GeneralDropdown
          id="format"
          label="Filtrar por formato"
          placeholder="Todos"
          register={register("format")}
          options={formatOptions}
        />
      </div>
      <div className="w-full md:w-1/2 lg:w-1/4">
        <GeneralSwitch
          id="myReservationsOnly"
          label="Solo mis reservas"
          checked={watch("myReservationsOnly") ?? false}
          onChange={(val) => setValue("myReservationsOnly", val)}
        />
      </div>
    </div>
  );
}
