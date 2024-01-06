import express from "express";
import { config } from "dotenv";

// Load env variables
config();

const app = express();

// middlewares
app.use(express.json()); // specify req and res params are json format

// routes
export default app;
