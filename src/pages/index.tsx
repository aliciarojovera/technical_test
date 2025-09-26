import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import type { ReactElement } from "react";
import { getCsrfToken } from "next-auth/react";
import { getServerAuthSession } from "@/server";
import { redirectByRole } from "@/common/utils/pagesRedirect";
import { GeneralLayout } from "@/frontend/common/layouts/GeneralLayout";
import { LoginHomepage } from "@/frontend/common/components/LoginHomepage";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context);
  const session = await getServerAuthSession(context);

  if (session) {
    return { redirect: { destination: redirectByRole(session.user.role) } };
  }

  return {
    props: {
      csrfToken,
    },
  };
}

function LoginHome({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <LoginHomepage csrfToken={csrfToken} />;
}

LoginHome.getLayout = function getLayout(
  page: ReactElement<GetServerSidePropsContext>,
) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default LoginHome;
