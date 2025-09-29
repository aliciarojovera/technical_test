import { useState } from "react";
import { useSession } from "next-auth/react";
import { FieldErrors, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import { api, RouterInputs } from "@/common/apiConnectors/browser";
import { GeneralInput } from "@/frontend/common/UI/GeneralInput";
import { GeneralDropdown } from "@/frontend/common/UI/GeneralDropdown";
import { formatOptions } from "@/common/utils/constants";
import { Toast } from "@/frontend/common/UI/Toast";

type CreateReservationInput = RouterInputs["client"]["createClientReservation"];

function CreateReservation() {
  const { data: session } = useSession();
  const router = useRouter();
  const { clientId } = router.query;

  const [toast, setToast] = useState<{
    message: React.ReactNode;
    type?: "success" | "error";
  } | null>(null);

  const { register, watch, handleSubmit } = useForm<CreateReservationInput>({
    defaultValues: {
      name: "",
      format: undefined,
      pax: 1,
      reservationDate: undefined,
      userId: session?.user.id || "",
    },
  });

  const mutation = api.client.createClientReservation.useMutation({
    onSuccess: () => {
      setToast({ message: "Reserva creada correctamente", type: "success" });
      router.push(`/client/${clientId as string}/reservation`);
    },
    onError: (err: { message: string }) => {
      setToast({
        message: err.message || "Error al crear la reserva",
        type: "error",
      });
    },
  });
  const onSubmit = (data: CreateReservationInput) => {
    mutation.mutate({
      id: clientId as string,
      name: data.name,
      format: data.format || undefined,
      userId: session?.user.id || "",
      pax: data.pax || 1,
      reservationDate: data.reservationDate || new Date(),
    });
  };

  const onError = (errors: FieldErrors<CreateReservationInput>) => {
    const messages = Object.values(errors)
      .map((e) => e?.message)
      .filter(Boolean);

    setToast({
      message: (
        <>
          {messages.map((msg, i) => (
            <p key={i}>{msg}</p>
          ))}
        </>
      ),
      type: "error",
    });
  };

  return (
    <section className="text-blue-darkest flex h-full w-full flex-col gap-y-6 px-[5%] py-10">
      <Link
        href={`/client/${clientId as string}/reservation`}
        className="text-left"
      >
        ← Volver{" "}
      </Link>
      <h1 className="text-2xl font-bold uppercase">Crear reserva</h1>
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
        <GeneralInput
          label="Nombre de la reserva"
          id="reservation-name"
          type="text"
          placeholder="Nombre de la reserva"
          register={register("name", {
            required: "El nombre es obligatorio",
            minLength: { value: 1, message: "Debe tener al menos 1 carácter" },
          })}
        />
        <GeneralInput
          label="Número de personas"
          id="reservation-pax"
          type="number"
          placeholder="Número de personas"
          register={register("pax", {
            valueAsNumber: true,
            min: { value: 1, message: "Debe ser al menos 1 persona" },
          })}
        />
        <GeneralInput
          label="Fecha y hora de la reserva"
          id="reservation-date"
          type="datetime-local"
          placeholder="Fecha y hora de la reserva"
          register={register("reservationDate", {
            valueAsDate: true,
            required: "La fecha y hora son obligatorias",
          })}
        />
        <GeneralDropdown
          id="reservation-format"
          label="Formato de la reserva"
          placeholder="Selecciona un formato"
          options={formatOptions}
          value={watch("format") ?? ""}
          register={register("format", {
            required: "Debes seleccionar un formato",
          })}
          generalInputContainer="w-full"
        />
      </div>
      <div className="flex w-full">
        <button
          onClick={handleSubmit(onSubmit, onError)}
          className="hover:bg-main-blue bg-blue-medium inline-block rounded px-4 py-2 text-center text-white transition"
        >
          Crear reserva
        </button>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </section>
  );
}

export { CreateReservation };
