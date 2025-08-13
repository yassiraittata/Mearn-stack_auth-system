import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { showErrorToast } from "../utils/toast";
import { hasMinLength, isValidEmail } from "../utils/validators";

function Login() {
  const navigate = useNavigate();
  const [state, setState] = useState("sign up");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function submitHandler(e) {
    e.preventDefault();

    if (
      (state === "sign up" && !name.trim()) ||
      !email.trim() ||
      !password.trim()
    ) {
      return showErrorToast("All feilds are required!");
    }

    if (!isValidEmail(email)) return showErrorToast("Invalid Email");
    if (!hasMinLength(password, 6))
      return showErrorToast("Password should be at least 6 characters long!");
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <img
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-0 ">
          {state === "sign up" ? "Create account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "sign up"
            ? "Create your account"
            : "Login to your account"}
        </p>
        <form onSubmit={submitHandler}>
          {state === "sign up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c] ">
              <img src={assets.person_icon} alt="" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Full Name"
                className="bg-transparent outline-none"
              />
            </div>
          )}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c] ">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Email"
              className="bg-transparent outline-none"
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c] ">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none"
            />
          </div>
          <p className="mb-4 text-indigo-50 cursor-pointer">
            Forgot password ?
          </p>
          <button className="w-full py-2.5 rounded-full cursor-pointer bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium text-white first-letter:uppercase">
            {state}
          </button>
        </form>
        {state === "sign up" && (
          <p className="text-gray-400 text-center text-xs mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer underline"
              onClick={() => setState("login")}
            >
              Login here
            </span>
          </p>
        )}
        {state === "login" && (
          <p className="text-gray-400 text-center text-xs mt-4">
            Don't have an account?{" "}
            <span
              className="text-blue-400 cursor-pointer underline"
              onClick={() => setState("sign up")}
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
