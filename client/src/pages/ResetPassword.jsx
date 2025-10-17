import React, { useContext, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "../utils/toast";

function ResetPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isotpSubmitted, setIsotpSubmitted] = useState(false);

  const [otp, setOtp] = useState(0);

  const inputRefs = useRef([]);
  const { backendUrl } = useContext(AppContext);
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

  const onSubmitEmail = async (e) => {
    e.preventDefault();

    try {
      const url = backendUrl + "/api/auth/send-reset-otp";

      const { data } = await axios.post(url, { email });

      if (data.success) {
        showSuccessToast(data.message);
        setIsEmailSent(true);
      } else {
        showErrorToast(data.message || "something went wrong");
      }
    } catch (error) {
      showErrorToast(error.message || "something went wrong");
    }
  };

  const onSubmitOTP = async (e) => {
    e.preventDefault();

    const otpArray = inputRefs.current.map((e) => e.value);
    const otp = otpArray.join("");

    setOtp(otp);
    setIsotpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();

    try {
      const url = backendUrl + "/api/auth/send-reset-otp";

      const { data } = await axios.post(url, {
        email,
        otp,
        newPassword: password,
      });

      if (data.success) {
        showSuccessToast(data.message);
        navigate("/login");
      } else {
        showErrorToast(data.message || "something went wrong");
      }
    } catch (error) {
      showErrorToast(error.message || "something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        onClick={() => navigate("/")}
      />
      {!isEmailSent && (
        <form
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
          onSubmit={onSubmitEmail}
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your email address
          </p>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]">
            <img src={assets.mail_icon} alt="" />
            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent outline-none text-white"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <button className="w-full py-2.5 rounded-full cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium text-white first-letter:uppercase">
            Submit
          </button>
        </form>
      )}

      {/* otp input form */}
      {!isotpSubmitted && isEmailSent && (
        <form
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
          onSubmit={onSubmitOTP}
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset password OTP
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
            Submit
          </button>
        </form>
      )}
      {/* New password */}
      {isotpSubmitted && isEmailSent && (
        <form
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
          onSubmit={onSubmitNewPassword}
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            New password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the new password
          </p>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]">
            <img src={assets.lock_icon} alt="" />
            <input
              type="password"
              placeholder="password"
              className="bg-transparent outline-none text-white"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className="w-full py-2.5 rounded-full cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium text-white first-letter:uppercase">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
