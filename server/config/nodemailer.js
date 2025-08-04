import nodemailer from "nodemailer";

import env from "../utils/validateEnv.js";

const transport = nodemailer.createTransport({
  host: env.HOSTNAME,
  port: 2525,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

export default transport;
