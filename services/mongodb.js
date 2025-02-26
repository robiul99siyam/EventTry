import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
const cached = {};

async function connectMongo() {
  if (!MONGO_URI) {
    throw new Error(
      "Please define the MONGO_URI environment variable inside .env.local"
    );
  }

  if (cached.connection) {
    console.log("Using cached database connection");
    return cached.connection;
  }

  if (!cached.promise) {
    console.log("Connecting to MongoDB...");
    const opts = { bufferCommands: false };
    cached.promise = mongoose.connect(MONGO_URI, opts);
  }

  try {
    cached.connection = await cached.promise;
    console.log("Connected to MongoDB successfully!");
  } catch (e) {
    console.error("MongoDB connection error:", e);
    cached.promise = undefined;
    throw e;
  }

  return cached.connection;
}

export default connectMongo;
