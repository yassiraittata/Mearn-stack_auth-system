import app from "./app.js";
import "dotenv/config";

import env from "./utils/validateEnv.js";

const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
