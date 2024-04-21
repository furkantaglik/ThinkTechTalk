import { useAuthContext } from "@/context/AuthContext";
import { apiUrl, successStatusCodes } from "@/lib/constants";
import { handleError } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";

export const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const signUp = async (formData: object) => {
    setIsLoading(true);
    try {
      const response = await axios.post(apiUrl + "/auth/signup", {
        ...formData,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { message, ...user } = response.data;
      if (!successStatusCodes.includes(response.status)) {
        setIsLoading(false);
      } else {
        localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: "LOGIN", payload: response.data });
        setIsLoading(false);
      }
    } catch (error) {
      handleError(error);
      setIsLoading(false);
      window.location.reload();
    }
  };
  return { signUp, isLoading };
};
