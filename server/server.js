import app from "./app.js";
import "dotenv/config";

import env from "./utils/validateEnv.js";
import connectDB from "./config/db.js";

const PORT = env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  });
