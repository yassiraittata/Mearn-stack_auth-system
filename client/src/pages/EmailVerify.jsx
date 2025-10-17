import React, { useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { AppContext } from "../context/AppContext";
import axios from "axios";

function EmailVerify() {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const { backendUrl, getUserData, isLoggedIn, userData } =
    useContext(AppContext);
  axios.defaults.withCredentials = true;

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleRemoveNumber = (e, index) => {
    if (e.key === "Backspace" && e.target.value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((el, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = el;
      }
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const url = backendUrl + "/api/auth/verify-account";

      const { data } = await axios.post(url, { otp });

      if (data.success) {
        showSuccessToast(data.message);
        getUserData();
        navigate("/");
      } else {
        showErrorToast(data.message || "something went wrong");
      }
    } catch (error) {
      showErrorToast(error.message || "something went wrong");
    }
  };

  useEffect(() => {
    if (isLoggedIn && userData && userData.isAccountVerified) {
      navigate("/");
    }
  }, [isLoggedIn, userData, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        onClick={() => navigate("/")}
      />

      <form
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        onSubmit={onSubmitHandler}
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Email verify OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6-digits code sent to your email id.
        </p>

        <div className="flex justify-between mb-8" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => {
              return (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md"
                  ref={(e) => (inputRefs.current[index] = e)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleRemoveNumber(e, index)}
                />
              );
            })}
        </div>
        <button className="w-full py-2.5 rounded-full cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium text-white first-letter:uppercase">
          Verify email
        </button>
      </form>
    </div>
  );
}

export default EmailVerify;
