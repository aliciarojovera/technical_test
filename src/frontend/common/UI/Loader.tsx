import { useEffect, useState } from "react";

export const Loader: React.FC = () => {
  const [height, setHeight] = useState<string>("100vh"); // valor por defecto para SSR

  useEffect(() => {
    setHeight(`calc(${window.innerHeight}px - 5rem)`); // calcula en cliente
  }, []);

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-y-12 px-[5%] py-10"
      style={{ height }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="border-main-blue h-12 w-12 animate-spin rounded-full border-4 border-t-transparent"></div>
      </div>
    </div>
  );
};
