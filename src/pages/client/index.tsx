import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ReactElement } from "react";
import { Role } from "@prisma/client";
import { getSessionProtectedRedirects } from "@/common/utils/pagesRedirect";
import { BackOfficeLayout } from "@/frontend/backOffice/layouts/BackOfficeLayout";
import { ClientDashboard } from "@/frontend/client/components/ClientDashboard";

type ClientIndexRouteProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const result = await getSessionProtectedRedirects(context, Role.CLIENT);

  return {
    ...result,
    props: {
      ...(result.props || {}),
    },
  };
};

function ClientIndexRoute() {
  return <ClientDashboard />;
}

ClientIndexRoute.getLayout = function getLayout(
  page: ReactElement<ClientIndexRouteProps>,
) {
  return <BackOfficeLayout>{page}</BackOfficeLayout>;
};

export default ClientIndexRoute;
