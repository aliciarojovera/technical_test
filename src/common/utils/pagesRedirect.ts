import { GetServerSidePropsContext } from "next";
import { Role } from "@prisma/client";
import { getSession } from "next-auth/react";

export function redirectByRole(role: Role) {
  if (role === Role.ADMIN) {
    return "/backOffice";
  }
  if (role === Role.CLIENT) {
    return "/client";
  }
  return "/not-authorized";
}

export async function getSessionProtectedRedirects(
  context: GetServerSidePropsContext,
  role: Role,
) {
  const session = await getSession(context);

  if (session?.sessionError) {
    return {
      props: { error: session.sessionError },
    };
  }

  if (!session?.user?.email) {
    const resolvedUrlQueryParams = context.resolvedUrl
      ? `?callback_url=${context.resolvedUrl}`
      : "";
    return {
      redirect: {
        destination: `/${resolvedUrlQueryParams}`,
        permanent: false,
      },
    };
  }

  if (session.user.role !== role) {
    return {
      redirect: {
        destination: redirectByRole(session.user.role),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
