import jwt from "jsonwebtoken";
import env from "../utils/validateEnv.js";
import createError from "http-errors";

const userAuth = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.json({ success: false });
  }

  const decoded = jwt.verify(token, env.JWT_SECRET);

  if (!decoded || !decoded.id) {
    return res.json({ success: false });
  }

  req.userId = decoded.id;
  next();
};

export default userAuth;
