import Image from "next/image";
import { useForm } from "react-hook-form";
import { api, RouterInputs } from "@/common/apiConnectors/browser";
import { GeneralInput } from "@/frontend/common/UI/GeneralInput";
import { GeneralActionResetIcon } from "@/frontend/common/UI/Icons/GeneralActionResetIcon";

type BackOfficeAdminFiltersInputs =
  RouterInputs["backOffice"]["getAllBackOfficeAdmins"];

function BackOfficeDashboard() {
  const { register, watch, resetField } = useForm<BackOfficeAdminFiltersInputs>(
    {
      defaultValues: {
        name: "",
      },
    },
  );

  const { data: backOfficeAdmins, isPending } =
    api.backOffice.getAllBackOfficeAdmins.useQuery({
      name: watch("name"),
    });

  const onClickResetFilters = () => {
    resetField("name");
  };

  return (
    <section className="flex w-full flex-col items-center gap-y-12 px-[5%] py-10">
      <h1 className="text-2xl font-bold uppercase">Listado Admins</h1>

      <article className="-mt-2 flex w-full items-center gap-y-10">
        <article className="flex w-full items-end justify-between gap-x-4 pt-5">
          <GeneralInput
            id="name"
            label="Buscar por nombre"
            type="text"
            placeholder="Alice Johnson"
            register={register("name")}
            generalInputContainer="w-[calc(100%-2rem)]"
          />

          <button
            onClick={onClickResetFilters}
            type="button"
            className="mb-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-500"
          >
            <GeneralActionResetIcon color="white" />
          </button>
        </article>
      </article>

      <article className="w-full rounded-md border border-gray-300">
        <article className="grid grid-cols-3 gap-4 border-b border-gray-300 p-4 font-semibold text-gray-700">
          <h6>Imagen</h6>
          <h6>Nombre</h6>
          <h6>Email</h6>
        </article>

        {isPending ? (
          <p className="ml-3 p-8 text-gray-600">Cargando...</p>
        ) : !backOfficeAdmins || backOfficeAdmins.length === 0 ? (
          <article className="flex items-center justify-center p-8">
            <p className="text-gray-600">No hay Admins que mostrar</p>
          </article>
        ) : (
          <article className="rounded-b-md">
            {backOfficeAdmins.map((admin, index) => (
              <article
                key={admin.id}
                className={`grid grid-cols-3 items-center gap-4 p-4 text-gray-600 ${
                  index !== backOfficeAdmins.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <div className="relative block h-12 w-12">
                  <Image
                    src={admin.image || "https://robohash.org/default"}
                    alt={`${admin.name} avatar`}
                    fill
                    sizes="100%"
                    style={{
                      objectFit: "contain",
                      borderRadius: "0.75rem",
                    }}
                  />
                </div>
                <p>{admin.name}</p>
                <p>{admin.email}</p>
              </article>
            ))}
          </article>
        )}
      </article>
    </section>
  );
}

export { BackOfficeDashboard };
