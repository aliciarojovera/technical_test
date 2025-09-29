import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ReactElement } from "react";
import { Role } from "@prisma/client";
import { getSessionProtectedRedirects } from "@/common/utils/pagesRedirect";
import { BackOfficeLayout } from "@/frontend/backOffice/layouts/BackOfficeLayout";
import ReservationDashboard from "@/frontend/client/components/ReservationDashboard";

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
  return <ReservationDashboard />;
}

ClientIndexRoute.getLayout = function getLayout(
  page: ReactElement<ClientIndexRouteProps>,
) {
  return <BackOfficeLayout>{page}</BackOfficeLayout>;
};

export default ClientIndexRoute;
