import jwt from "jsonwebtoken";
import env from "../utils/validateEnv.js";
import createError from "http-errors";

const userAuth = (req, res, next) => {
  const token = req.cookies?.token;

  console.log(token);

  if (!token) {
    return next(
      createError(403, "Not Authorised. Make sure you are logged in!")
    );
  }

  const decoded = jwt.verify(token, env.JWT_SECRET);

  if (!decoded || !decoded.id) {
    return next(
      createError(403, "Not Authorised. Make sure you are logged in!")
    );
  }

  req.userId = decoded.id;
  next();
};

export default userAuth;
