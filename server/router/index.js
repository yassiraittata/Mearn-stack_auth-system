import express from "express";

import authRouter from "./auth.js";
import userRouter from "./user.js";

const router = express.Router();

export default () => {
  authRouter(router);
  userRouter(router);
  return router;
};
