import createError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/userModel.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(createError(400, "All feilds are required!"));
  }

  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    return next(createError(400, "User already exists!"));
  }

  const hashedPw = await bcrypt.hash(password, 12);

  const user = new UserModel({
    name,
    email,
    password: hashedPw,
  });

  await user.save();

  
};
