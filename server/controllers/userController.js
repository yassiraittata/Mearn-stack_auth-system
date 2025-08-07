import createError from "http-errors";

import UserModel from "../models/userModel.js";
import env from "../utils/validateEnv.js";

export const getUserData = async (req, res, next) => {
  const { userId } = req.body;

  const user = await UserModel.findById(userId);

  if (!user) {
    return next(createError(404, "User was not found!"));
  }

  res.json({
    success: true,
    userData: {
      name: user.name,
      isAccountVerified: user.isAccountVerified,
    },
  });
};
