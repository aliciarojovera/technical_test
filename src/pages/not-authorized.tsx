import type { ReactElement } from "react";
import { NotAuthorized } from "@/frontend/common/components/NotAuthorized";
import { GeneralLayout } from "@/frontend/common/layouts/GeneralLayout";

function LogOutRoute() {
  return <NotAuthorized />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
LogOutRoute.getLayout = function getLayout(page: ReactElement<any>) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default LogOutRoute;
