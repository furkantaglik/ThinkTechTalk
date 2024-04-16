import { Outlet, Navigate } from "react-router-dom";
export function PrivateRoutes() {
  const auth = localStorage.getItem("token");
  return auth ? <Outlet /> : <Navigate to="/login" />;
}
