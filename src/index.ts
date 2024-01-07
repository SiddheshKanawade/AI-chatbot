import { connectDB, disconnectDB } from "./config/db.js";

import app from "./app.js";

const PORT = process.env.PORT || 7000;

// connection and listener
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server on port 3000");
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Couldn't start server");
  });
