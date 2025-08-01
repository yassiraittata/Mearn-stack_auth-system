import mongoose from "mongoose";
import env from "../utils/validateEnv.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI);

    console.log(`MongoDB Connected`);
  } catch (error) {
    throw error;
  }
};

export default connectDB;
