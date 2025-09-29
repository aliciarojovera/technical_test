import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ReactElement } from "react";
import { Role } from "@prisma/client";
import { getSessionProtectedRedirects } from "@/common/utils/pagesRedirect";
import { BackOfficeLayout } from "@/frontend/backOffice/layouts/BackOfficeLayout";
import { CreateReservation } from "@/frontend/client/components/CreateReservation";

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

function CreateClientReservationIndexRoute() {
  return <CreateReservation />;
}

CreateClientReservationIndexRoute.getLayout = function getLayout(
  page: ReactElement<ClientIndexRouteProps>,
) {
  return <BackOfficeLayout>{page}</BackOfficeLayout>;
};

export default CreateClientReservationIndexRoute;
