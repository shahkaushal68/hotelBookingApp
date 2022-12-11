import React, { createContext, useReducer } from "react";
import searchReducer, { inititalState } from "./searchReducer";

export const search = createContext();

const SearchContext = ({ children }) => {
  const [state, dispatch] = useReducer(searchReducer, inititalState);
  return (
    <search.Provider value={{ state, dispatch }}>{children}</search.Provider>
  );
};

export default SearchContext;
