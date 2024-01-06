import { connect, disconnect } from "mongoose";

async function connectDB() {
  try {
    await connect(process.env.MONGODB_URL);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error);
    throw new Error("Error connecting to DB");
  }
}

async function disconnectDB() {
  try {
    await disconnect();
    console.log("Disconnected from DB");
  } catch (error) {
    console.log(error);
    throw new Error("Error disconnecting from DB");
  }
}

export { connectDB, disconnectDB };
