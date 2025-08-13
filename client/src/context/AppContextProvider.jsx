import { useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";
import { showErrorToast } from "../utils/toast";

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(false);

  const getUserData = async () => {
    try {
      const url = backendUrl + "/api/user/data";
      const { data } = await axios.get(url, {
        withCredentials: true,
      });
      data.success ? setUserData(data.userData) : showErrorToast(data.message);
    } catch (error) {
      showErrorToast(error.response.data.message);
    }
  };

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
