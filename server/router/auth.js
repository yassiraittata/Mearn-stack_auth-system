import {
  register,
  login,
  logout,
  sendVerifyOtp,
  verfyEmail,
  isAuthenticated,
  sendRestOTP,
  resetPassword,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

export default (router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/logout", logout);

  router.post("/auth/send-verify-otp", userAuth, sendVerifyOtp);
  router.post("/auth/verify-account", userAuth, verfyEmail);
  router.get("/auth/is-auth", userAuth, isAuthenticated);

  router.post("/auth/send-reset-otp", sendRestOTP);
  router.post("/auth/reset-password", resetPassword);
};
