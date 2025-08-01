import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import createError from "http-errors";
import cookieParser from "cookie-parser";

import errorHandler from "./middleware/errorHandler.js";
import router from "./router/index.js";

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router());

app.use(errorHandler);

export default app;
