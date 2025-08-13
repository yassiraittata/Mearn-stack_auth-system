import { createContext } from "react";

export const AppContext = createContext({
  backendUrl: "",
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userData: null,
  setUserData: () => {},
  getUserData: () => {},
});
