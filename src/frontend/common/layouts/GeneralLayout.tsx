interface LayoutProps {
  style?: React.CSSProperties;
  children: React.ReactNode;
}

function GeneralLayout({ style, children }: LayoutProps) {
  return (
    <main className="relative flex min-h-screen justify-between" style={style}>
      {children}
    </main>
  );
}

export { GeneralLayout };
