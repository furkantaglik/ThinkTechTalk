import { type ClassValue, clsx } from "clsx";
import { toast } from "@/components/ui/use-toast";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

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

export function getToken() {
  const userString = localStorage.getItem("user");
  if (!userString) {
    return null;
  }
  const user = JSON.parse(userString!);
  const token = user.token;
  return token;
}

export function getDecodedToken() {
  const token = getToken();
  return jwtDecode(token);
}

export function getUserFromLocal() {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString!);
  return user;
}
