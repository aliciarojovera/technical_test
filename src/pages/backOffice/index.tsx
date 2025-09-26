import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { ReactElement } from "react";
import { Role } from "@prisma/client";
import { getSessionProtectedRedirects } from "@/common/utils/pagesRedirect";
import { BackOfficeDashboard } from "@/frontend/backOffice/components/BackOfficeDashboard";
import { BackOfficeLayout } from "@/frontend/backOffice/layouts/BackOfficeLayout";

type BackOfficeUsersAdminIndexRouteProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>;

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const result = await getSessionProtectedRedirects(context, Role.ADMIN);

  return {
    ...result,
    props: {
      ...(result.props || {}),
    },
  };
};

function BackOfficeUsersAdminIndexRoute() {
  return <BackOfficeDashboard />;
}

BackOfficeUsersAdminIndexRoute.getLayout = function getLayout(
  page: ReactElement<BackOfficeUsersAdminIndexRouteProps>,
) {
  return <BackOfficeLayout>{page}</BackOfficeLayout>;
};

export default BackOfficeUsersAdminIndexRoute;
