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

export const sendVerifyOtp = async (req, res, next) => {
  const { userId } = req.body;

  const user = await UserModel.findById(userId);

  if (!user) {
    return next(createError(400, "User was not found!"));
  }

  if (user.isAccountVerifired) {
    return next(createError(400, "Account already verified"));
  }

  const otp = String(Math.floor(Math.random() * 900000 + 100000));

  user.verifyOtp = otp;
  user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

  await user.save();

  //   sending welcome Email
  const mailOptions = {
    from: env.SENDER_EMAIL,
    to: user.email,
    subject: "Account verification OTP",
    text: "Your OTP is " + otp + ". Verify your account using this OTP",
  };

  await transporter.sendMail(mailOptions);

  res.json({ success: true, Message: "Verification OTP ent on Email" });
};

export const verfyEmail = async (req, res, next) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return next(
      createError(400, "Missing details, make sure to provide user and OTP")
    );
  }

  const user = await UserModel.findById(userId);

  if (!user) {
    return next(createError(400, "User was not found!"));
  }

  if (user.verifyOtp === "" || user.verifyOtp !== otp) {
    return next(createError(400, "Invalid OTP"));
  }

  if (user.verifyOtpExpireAt < Date.now()) {
    return next(createError(400, "OTP Expired"));
  }

  user.isAccountVerifired = true;
  user.verifyOtp = "";
  user.verifyOtpExpireAt = 0;

  await user.save();
  res.json({ success: true, Message: "User verified successfully" });
};

export const isAuthenticated = async (req, res, next) => {
  res.json({ success: true });
};

// Send Password reset OTP
export const sendRestOTP = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(createError(400, "Email is required"));
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return next(createError(404, "User not found"));
  }

  // Generate OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetOtp = otp;
  user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  await user.save();

  // Send OTP email
  const mailOptions = {
    from: env.SENDER_EMAIL,
    to: user.email,
    subject: "Password Reset OTP",
    text: `Your password reset OTP is ${otp}. It will expire in 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);

  res.json({ success: true, message: "Password reset OTP sent to email" });
};

// reset user password
export const resetPassword = async (req, res, next) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return next(createError(400, "Email, OTP, and new password are required"));
  }

  const user = await UserModel.findOne({ email });

  if (!user) {
    return next(createError(404, "User not found"));
  }

  if (!user.resetOtp || user.resetOtp !== otp) {
    return next(createError(400, "Invalid OTP"));
  }

  if (user.resetOtpExpireAt < Date.now()) {
    return next(createError(400, "Expired OTP"));
  }

  const hashedPw = await bcrypt.hash(newPassword, 12);

  user.password = hashedPw;
  user.resetOtp = "";
  user.resetOtpExpireAt = 0;

  await user.save();

  res.json({ success: true, message: "Password reset successfully" });
};
