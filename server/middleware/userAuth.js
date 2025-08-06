import jwt from "jsonwebtoken";
import env from "../utils/validateEnv.js";
import createError from "http-errors";

const userAuth = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return next(
      createError(401, "Not Authorised. Make sure you are logged in!")
    );
  }

  const decoded = jwt.verify(token, env.JWT_SECRET);

  if (!decoded || !decoded.id) {
    return next(
      createError(401, "Not Authorised. Make sure you are logged in!")
    );
  }

  req.body.userId = decoded.id;
  next();
};

export default userAuth;
