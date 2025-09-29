import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { api, RouterInputs } from "@/common/apiConnectors/browser";
import { Loader } from "@/frontend/common/UI/Loader";
import { Pagination } from "@/frontend/common/UI/PaginationInput";
import { ReservationFilters } from "@/frontend/client/components/ReservationFilters";
import { formatOptions, statusOptions } from "@/common/utils/constants";

type ReservationFiltersInputs = RouterInputs["client"]["getClientReservations"];

const colorMap = {
  SEATED: { bg: "bg-purple-100", text: "text-purple-600" },
  COCKTAIL: { bg: "bg-teal-100", text: "text-teal-600" },
  INITIAL_STATUS: { bg: "bg-blue-100", text: "text-blue-600" },
  CONFIRMATION_PENDING: { bg: "bg-orange-100", text: "text-orange-600" },
  CONFIRMED: { bg: "bg-green-100", text: "text-green-600" },
  CANCELLED: { bg: "bg-red-100", text: "text-red-600" },
};

function ReservationDashboard() {
  const { register, watch, setValue, reset } =
    useForm<ReservationFiltersInputs>({
      defaultValues: {
        itemsPerPage: 5,
        page: 1,
        name: "",
        format: undefined,
        status: undefined,
        myReservationsOnly: false,
      },
    });
  const router = useRouter();

  const { clientId } = router.query;
  const { data: session } = useSession();

  const {
    data: reservationsData,
    isPending,
    error,
  } = api.client.getClientReservations.useQuery({
    id: (clientId as string) || "",
    itemsPerPage: watch("itemsPerPage"),
    page: watch("page"),
    name: watch("name"),
    myReservationsOnly: watch("myReservationsOnly"),
    format: watch("format") || undefined,
    status: watch("status") || undefined,
    userId: session?.user.id || "",
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  function getOptionByValue(
    options: { label: string; value: string }[],
    value: string,
  ) {
    return options.find((opt) => opt.value === value);
  }

  if (error)
    return (
      <div className="flex w-full flex-col items-center gap-y-12 px-[5%] py-10">
        <p className="font-semibold text-red-500">Error: {error.message}</p>
      </div>
    );

  return (
    <section className="text-blue-darkest flex h-full w-full flex-col items-center gap-y-6 px-[5%] py-10">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="text-nowrap">
          <Link href="/client">← Volver </Link>
        </div>
        <div className="flex w-full flex-row items-center justify-end">
          <button
            onClick={() => {
              reset({
                itemsPerPage: 5,
                page: 1,
                name: "",
                format: undefined,
                status: undefined,
                myReservationsOnly: false,
              });
            }}
            className="mr-4 rounded bg-gray-200 px-4 py-2 text-center text-gray-700 transition hover:bg-gray-300"
          >
            Quitar filtros
          </button>
          <Link
            href={`/client/${clientId as string}/reservation/register`}
            className="hover:bg-main-blue bg-blue-medium inline-block rounded px-4 py-2 text-center text-white transition"
          >
            Crear reserva
          </Link>
        </div>
      </div>
      <h1 className="text-2xl font-bold uppercase">Reservas</h1>
      <ReservationFilters
        register={register}
        watch={watch}
        setValue={setValue}
      />
      <article className="w-full rounded-md border border-gray-300">
        <article className="grid grid-cols-6 gap-4 border-b border-gray-300 p-4 text-center font-semibold text-gray-700">
          <h6>Nombre</h6>
          <h6>PAX</h6>
          <h6>Fecha</h6>
          <h6>Estatus</h6>
          <h6>Formato</h6>
          <h6>Reservado por</h6>
        </article>
        {isPending ? (
          <Loader />
        ) : !reservationsData || reservationsData.reservations.length === 0 ? (
          <article className="flex items-center justify-center p-8">
            <p className="text-gray-600">No hay Reservas que mostrar</p>
          </article>
        ) : (
          <article className="rounded-b-md text-center">
            {reservationsData.reservations.map((reservation, index) => (
              <article
                key={reservation.id}
                className={`grid grid-cols-6 items-center gap-4 p-4 text-gray-600 ${
                  index !== reservationsData.reservations.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <p>{reservation.reservationName}</p>
                <p>{reservation.pax}</p>
                {reservation.reservationDate && (
                  <p>{formatDate(new Date(reservation.reservationDate))}</p>
                )}
                <div className="flex items-center justify-center">
                  <div
                    className={`w-fit rounded-xl px-2.5 py-0.5 text-sm font-medium shadow-sm transition-all ${colorMap[reservation.reservationStatus]?.bg} ${colorMap[reservation.reservationStatus]?.text}`}
                  >
                    {" "}
                    {
                      getOptionByValue(
                        statusOptions,
                        reservation.reservationStatus,
                      )?.label
                    }
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div
                    className={`w-fit rounded-xl px-2.5 py-0.5 text-sm font-medium shadow-sm transition-all ${colorMap[reservation.format]?.bg} ${colorMap[reservation.format]?.text}`}
                  >
                    {getOptionByValue(formatOptions, reservation.format)?.label}
                  </div>
                </div>
                <p>{reservation.user.name}</p>
              </article>
            ))}
          </article>
        )}
      </article>
      {reservationsData && (
        <Pagination
          totalItems={reservationsData.totalCount}
          itemsPerPage={watch("itemsPerPage") || 5}
          currentPage={watch("page") || 1}
          setCurrentPage={(page: number) => setValue("page", page)}
        />
      )}
    </section>
  );
}

export default ReservationDashboard;
