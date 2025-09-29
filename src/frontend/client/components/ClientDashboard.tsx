import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { api } from "@/common/apiConnectors/browser";
import { Loader } from "@/frontend/common/UI/Loader";
import { timeAgo } from "@/frontend/common/utils/timeAgo";

function ClientDashboard() {
  const { data: session } = useSession();

  const {
    data: clientData,
    isPending,
    error,
  } = api.client.getClient.useQuery({ id: session?.user?.id || "" });

  if (isPending) return <Loader />;

  if (error)
    return (
      <div className="flex w-full flex-col items-center gap-y-12 px-[5%] py-10">
        <p className="font-semibold text-red-500">Error: {error.message}</p>
      </div>
    );

  if (!clientData)
    return (
      <div className="flex w-full flex-col items-center gap-y-12 px-[5%] py-10">
        <p className="font-medium text-gray-500">
          No se han encontrado datos del cliente.
        </p>
      </div>
    );

  return (
    <section className="text-blue-darkest flex w-full flex-col items-center gap-y-12 px-[5%] py-10">
      {/* Card del cliente */}
      <article className="flex w-full max-w-3xl flex-col items-center gap-6 rounded-md border border-gray-300 bg-white p-6 text-center shadow-sm">
        <h1 className="text-2xl font-bold uppercase">{clientData.name}</h1>

        <div className="flex w-full flex-col gap-2 text-left text-gray-700">
          <p>
            <span className="font-semibold">Dirección:</span>{" "}
            {clientData.address || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Ciudad:</span>{" "}
            {clientData.city || "N/A"}
          </p>
          <p>
            <span className="font-semibold">Teléfono:</span>{" "}
            {clientData.phone || "N/A"}
          </p>
        </div>

        <Link
          href={`/client/${clientData.id}/reservation`}
          className="hover:bg-main-blue bg-blue-medium mt-4 inline-block rounded px-4 py-2 text-center text-white transition"
        >
          Ver reservas
        </Link>
      </article>

      {/* Sección de usuarios */}
      <div className="w-full max-w-3xl">
        <h2 className="mb-4 border-b border-gray-300 pb-2 text-left text-xl font-semibold text-gray-700">
          Usuarios del cliente
        </h2>

        <div className="flex flex-col gap-6 pb-6">
          {clientData.User.map((user) => (
            <article
              key={user.id}
              className="flex w-full flex-col items-center gap-4 rounded-md border border-gray-300 bg-white p-6 text-center shadow-sm md:flex-row md:justify-between md:text-left"
            >
              <div className="flex items-center gap-4">
                <div className="border-main-blue relative h-20 w-20 overflow-hidden rounded-full border-2 shadow-md">
                  <Image
                    src={user.image ?? "https://robohash.org/default"}
                    alt={user.email}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-main-blue text-lg font-bold">
                    {user.email}{" "}
                    {user.id === session?.user?.id && (
                      <span className="text-gray-500">(Tú)</span>
                    )}
                  </h3>
                  {user.createdAt && (
                    <span className="text-sm text-gray-500">
                      Miembro desde {timeAgo(user.createdAt)}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export { ClientDashboard };
