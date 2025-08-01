import express from "express";

import usersRouter from "./users.js";

const router = express.Router();

export default () => {
  usersRouter(router);
  return router;
};
