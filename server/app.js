import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import createError from "http-errors";
import cookieParser from "cookie-parser";

import errorHandler from "./middleware/errorHandler.js";
import router from "./router/index.js";

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api", router());

app.use((req, res, next) => {
  return next(createError(404, "Endpoint not Found!"));
});

app.use(errorHandler);

export default app;
