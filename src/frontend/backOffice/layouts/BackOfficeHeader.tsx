import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { CommonUserIcon } from "@/frontend/common/UI/Icons/CommonUserIcon";

function BackOfficeHeader() {
  const { data: session } = useSession();

  return (
    <>
      <header className="fixed top-0 z-40 flex h-20 w-full items-center justify-between border border-gray-300 px-5">
        <div className="relative block h-14 w-24 cursor-pointer">
          <Image
            src={"/images/logo.png"}
            alt="Logo"
            priority
            fill
            sizes="100%"
            style={{ objectFit: "contain" }}
          />
        </div>

        {!session ? (
          <CommonUserIcon width="1.5rem" height="1.5rem" />
        ) : (
          <article className="flex items-center gap-x-6">
            <p className="text-sm font-semibold text-gray-600">
              {session.user.name}
            </p>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="rounded-md border border-gray-300 p-2 text-xs text-gray-600"
            >
              Cerrar Sesión
            </button>
          </article>
        )}
      </header>
    </>
  );
}

export { BackOfficeHeader };
