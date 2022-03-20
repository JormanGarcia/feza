import { createContext, useContext, useEffect, useState } from "react";
import { setTimeout } from "timers";
import create from "zustand";

interface IToast {
  title: string;
  description: string;
  type?: "default" | "success" | "error";
  id: number;
}

interface IStore {
  toast: IToast | null;
  open: (a: Omit<IToast, "id">, b?: number) => void;
  close: () => void;
  openDefault: (option: "unexpected") => void;
}

const ToastContext = createContext<IStore | null>(null);

export const ToastContextProvider: React.FC = ({ children }) => {
  const [toast, setToast] = useState<IToast | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  function close() {
    setToast(null);
  }

  function open(props: Omit<IToast, "id">) {
    const newToast: IToast = { ...props, id: Math.random() };

    setToast(newToast);

    setTimeout(function () {
      setToast(null);
    }, 3000);
  }

  function openDefault(option: string) {
    if (option === "unexpected") {
      open({
        description:
          "Algo ha salido mal con esta accion. Vuelve a intentarlo por favor",
        title: "Error inesperados",
        type: "error",
      });
    }
  }

  return (
    <ToastContext.Provider
      value={{
        open,
        close,
        toast,
        openDefault,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext)!;
