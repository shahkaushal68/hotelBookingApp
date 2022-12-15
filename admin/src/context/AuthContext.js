import React, { createContext, useReducer } from "react";
import authReducer, { initialState } from "./authReducer";

export const auth = createContext();

const AuthContext = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return <auth.Provider value={{ state, dispatch }}>{children}</auth.Provider>;
};

export default AuthContext;
