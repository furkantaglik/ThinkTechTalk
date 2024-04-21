import { getUserFromLocal } from "@/lib/utils";
import {
  ReactNode,
  createContext,
  useContext,
  useReducer,
  Dispatch,
  useEffect,
} from "react";
interface AuthProviderProps {
  children: ReactNode;
}
interface Action {
  type: string;
  payload?: string;
}
interface AuthContextType {
  dispatch: Dispatch<Action>;
  user?: User;
}
interface User {
  token: string;
  username: string;
  email: string;
  id: string;
  role: string;
}
export const AuthContext = createContext<AuthContextType>({
  dispatch: () => {},
});

export const AuthReducer = (state: object, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: null,
  });

  useEffect(() => {
    dispatch({ type: "LOGIN", payload: getUserFromLocal() });
  }, []);
  console.log("authcontext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("useauthcontext must be used inside an authcontextprovider");
  }
  return context;
};
