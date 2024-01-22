import express from "express";
import { config } from "dotenv";
import morgan from "morgan";

import router from "./routes/router.js";

// Load env variables
config();

const app = express();

// middlewares
app.use(express.json()); // specify req and res params are json format
app.use(morgan("dev")); // log requests to console in dev mode

// routes
app.use("/api/v1", router);

export default app;
