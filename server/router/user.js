import { getUserData } from "../controllers/UserController.js";
import userAuth from "../middleware/userAuth.js";

export default (router) => {
  router.get("/user/data", userAuth, getUserData);
};
