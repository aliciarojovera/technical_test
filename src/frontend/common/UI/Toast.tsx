import { useEffect, useState, ReactNode } from "react";

interface ToastProps {
  message: string | ReactNode; // Puede ser texto o JSX
  type?: "success" | "error" | "info";
  duration?: number;
  onClose?: () => void;
}

export function Toast({
  message,
  type = "info",
  duration = 3000,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const typeClasses = {
    success: "bg-green-100 text-green-700 border-green-300",
    error: "bg-red-100 text-red-700 border-red-300",
    info: "bg-blue-100 text-blue-700 border-blue-300",
  };

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 max-w-xs rounded border px-4 py-2 shadow-md transition-all ${typeClasses[type]}`}
    >
      {typeof message === "string" ? <p>{message}</p> : message}
      <button
        className="absolute right-0 top-0 mr-1 mt-1 text-lg font-bold text-current hover:opacity-70"
        onClick={() => {
          setVisible(false);
          onClose?.();
        }}
      >
        ×
      </button>
    </div>
  );
}
