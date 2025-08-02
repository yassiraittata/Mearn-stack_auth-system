import { register, login, logout } from "../controllers/authController.js";

export default (router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/logout", logout);
};
