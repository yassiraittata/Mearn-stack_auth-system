import { register } from "../controllers/authController";

export default (router) => {
  router.get("/register", register);
};
