import React, { createContext, useReducer } from "react";
import authReducer, { authInititalState } from "./authReducer";

export const auth = createContext();

const AuthContext = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, authInititalState);
  return <auth.Provider value={{ state, dispatch }}>{children}</auth.Provider>;
};

export default AuthContext;
