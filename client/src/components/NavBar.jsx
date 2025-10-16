import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { showErrorToast } from "../utils/toast";

function NavBar() {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContext);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;

      const url = backendUrl + "/api/auth/logout";

      const { data } = await axios.post(url);

      console.log("DATA ", data);

      if (data?.success) {
        setIsLoggedIn(false);
        setUserData(null);
        navigate("/");
      }
    } catch (error) {
      showErrorToast(error.message || "something went wrong");
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
      <img
        src={assets.logo}
        alt="Logo"
        className="w-28 sm:w-32"
        onClick={() => navigate("")}
      />

      {userData ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-black relative text-white group">
          {userData.name[0].toUpperCase()}
          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 bg-gray-100 text-sm  min-w-28 p-2">
              {!userData.isAccountVerified && (
                <li className="py-1 px-2 hover:bg-gray-200 cursor-pointer">
                  Verify email
                </li>
              )}
              <li
                className="py-1 px-2 hover:bg-gray-200 cursor-pointer pr-10"
                onClick={logout}
              >
                Log out
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          type="button"
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
          <img src={assets.arrow_icon} alt="" />
        </button>
      )}
    </div>
  );
}

export default NavBar;
