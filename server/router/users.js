import { register } from "../controllers/authController.js";

export default (router) => {
  router.get("/register", register);
};
