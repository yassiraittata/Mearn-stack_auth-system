import {
  register,
  login,
  logout,
  sendVerifyOtp,
  verfyEmail,
  isAuthenticated,
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

export default (router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/logout", logout);

  router.post("/auth/send-verify-otp", userAuth, sendVerifyOtp);
  router.post("/auth/verify-account", userAuth, verfyEmail);
  router.post("/auth/is-auth", userAuth, isAuthenticated);
};
