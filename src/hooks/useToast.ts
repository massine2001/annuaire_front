import { useState } from "react";

export type ToastType = "success" | "error" | "info";

export type ToastData = {
  message: string;
  type: ToastType;
};

export function useToast() {
  const [toast, setToast] = useState<ToastData | null>(null);

  const showToast = (message: string, type: ToastType = "success") => {
    setToast({ message, type });
  };

  const showSuccess = (message: string) => {
    showToast(message, "success");
  };

  const showError = (message: string) => {
    showToast(message, "error");
  };

  const showInfo = (message: string) => {
    showToast(message, "info");
  };

  const hideToast = () => {
    setToast(null);
  };

  return {
    toast,
    showToast,
    showSuccess,
    showError,
    showInfo,
    hideToast,
  };
}
