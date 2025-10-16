import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";
import { showErrorToast } from "../utils/toast";

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  axios.defaults.withCredentials = true;

  const getUserData = async () => {
    try {
      const url = backendUrl + "/api/user/data";
      const { data } = await axios.get(url);
      data.success ? setUserData(data.userData) : showErrorToast(data.message);
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };

  const getAuthState = async () => {
    try {
      const url = backendUrl + "/api/auth/is-auth";

      // if (!isLoggedIn) return;

      const { data } = await axios.get(url);
      if (data.success) {
        setIsLoggedIn(true);
        getUserData();
      }
    } catch (error) {
      showErrorToast(
        error.response.data.message || error.message || "something went wrong"
      );
    }
  };

  useEffect(() => {
    getAuthState();
  }, []);

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    getAuthState,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
