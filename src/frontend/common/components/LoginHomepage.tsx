import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { redirectByRole } from "@/common/utils/pagesRedirect";
import { GeneralInput } from "@/frontend/common/UI/GeneralInput";

interface LoginHomepageProps {
  csrfToken: string | undefined;
}

interface LoginFormData {
  email: string;
  password: string;
}

function LoginHomepage({ csrfToken }: LoginHomepageProps) {
  const router = useRouter();

  const { handleSubmit, register, formState, setError } =
    useForm<LoginFormData>({
      defaultValues: {
        email: "",
        password: "",
      },
    });

  const errors = formState.errors;

  const onSubmit: SubmitHandler<LoginFormData> = async (data, e) => {
    e?.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
        csrfToken,
      });
      if (result?.error) {
        setError("root", {
          type: "manual",
          message:
            result.error === "CredentialsSignin"
              ? "Credentials error"
              : result.error,
        });
      }
      if (result?.ok) {
        const session = await getSession();
        if (!session?.user?.role) throw new Error();
        const redirectUrl =
          (router.query.callback_url as string) ||
          redirectByRole(session.user.role);
        router.push(redirectUrl);
      }
    } catch {
      setError("root", {
        message: "Something went wrong. Try again or contact the support team",
      });
    }
  };

  return (
    <section className="flex w-full flex-col justify-center gap-y-9 px-[10%]">
      <h2 className="mobile:text-3xl text-4xl font-bold italic">Login</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-y-10"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />

        <article className="flex w-full flex-col gap-y-8">
          <GeneralInput
            id="email"
            label="Email *"
            type="email"
            placeholder="user@example.com"
            register={register("email", {
              required: "El email es requerido",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email inválido",
              },
            })}
            errorMessage={errors?.email?.message}
          />

          <GeneralInput
            id="password"
            label="Contraseña *"
            type="password"
            placeholder="Escribe tu contraseña"
            register={register("password", {
              required: "La contraseña es requerida",
            })}
            errorMessage={errors?.password?.message}
          />
        </article>

        {errors.root && (
          <p className="-mb-4 -mt-6 text-red-400">{errors.root.message}</p>
        )}

        <button
          type="submit"
          className="h-10 items-end rounded-md bg-red-800 px-4 text-sm font-semibold text-neutral-50 hover:brightness-[1.2]"
        >
          Iniciar sesión
        </button>
      </form>
    </section>
  );
}

export { LoginHomepage };
