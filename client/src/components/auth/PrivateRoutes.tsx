import { useAuthContext } from "@/context/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
export function PrivateRoutes() {
  const { user } = useAuthContext();

  return user ? <Outlet /> : <Navigate to="/login" />;
}
