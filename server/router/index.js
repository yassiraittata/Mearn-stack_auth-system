import express from "express";

import authRouter from "./auth.js";

const router = express.Router();

export default () => {
  authRouter(router);
  return router;
};
