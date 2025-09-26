import type { AppProps } from "next/app";
import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { api } from "@/common/apiConnectors/browser";
import { GeneralLayout } from "@/frontend/common/layouts/GeneralLayout";
import "@/frontend/common/styles/globals.css";

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
> & { getLayout?: (page: ReactElement<any>) => ReactNode };

type AppPropsWithLayout = AppProps<{ session: Session }> & {
  Component: NextPageWithLayout;
};

function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ?? ((page) => <GeneralLayout>{page}</GeneralLayout>);

  return (
    <SessionProvider session={session}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  );
}

export default api.withTRPC(App);
