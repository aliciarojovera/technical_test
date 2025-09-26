import { BackOfficeHeader } from "./BackOfficeHeader";

interface BackOfficeLayoutProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

function BackOfficeLayout({ style, children }: BackOfficeLayoutProps) {
  return (
    <>
      <BackOfficeHeader />

      <main
        className="relative mt-[5rem] flex max-h-[calc((100vh-5rem))] min-h-[calc((100vh-5rem))] justify-between overflow-y-auto"
        style={style}
      >
        {children}
      </main>
    </>
  );
}

export { BackOfficeLayout };
