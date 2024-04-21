import { useAuthContext } from "@/context/AuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    window.location.reload();
  };
  return { logout };
};
