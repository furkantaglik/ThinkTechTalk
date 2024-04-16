import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { type ClassValue, clsx } from "clsx";
// import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleError(error: unknown) {
  axios.isAxiosError(error)
    ? toast({
        variant: "destructive",
        title: "Hata",
        description: error!.response!.data.message,
      })
    : toast({
        variant: "destructive",
        title: "İstemci hatası",
        description: (error as Error).message,
      });
}

export function isLogin() {
  return localStorage.getItem("token");
}
