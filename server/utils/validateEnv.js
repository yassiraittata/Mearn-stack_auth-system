import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
  PORT: port({ default: 8080 }),
  MONGO_URI: str(),
  JWT_SECRET: str(),
  NODE_ENV: str(),
  SMTP_USER: str(),
  SMTP_PASSWORD: str(),
  HOSTNAME: str(),
  SENDER_EMAIL: str(),
});
