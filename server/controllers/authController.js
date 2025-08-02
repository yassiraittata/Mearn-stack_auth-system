import createError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import env from "../utils/validateEnv.js";

export const register = async (req, res, next) => {
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

  const token = jwt.sign(
    {
      id: user._id,
      email,
    },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  //   sending welcome Email
  const mailOptions = {
    from: env.SENDER_EMAIL,
    to: email,
    subject: "Welcome to our community",
    text: "Welcome to this wonderful community!",
  };

  await transporter.sendMail(mailOptions);

  res.json({ success: true });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createError(400, "All feilds are required!"));
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return next(createError(400, "Invalid email!"));
  }

  const isPwMatch = await bcrypt.compare(password, user.password);

  if (!isPwMatch) {
    return next(createError(400, "Invalid password"));
  }

  const token = jwt.sign(
    {
      id: user._id,
      email,
    },
    env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ success: true });
};

export const logout = (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: env.NODE_ENV === "production" ? "none" : "strict",
  });
  res.json({ success: true });
};
