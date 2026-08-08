import dotenv from "dotenv";
dotenv.config();

import app from "../app.js";
import connectDB from "../configs/db.js";

const handler = async (req, res) => {
  try {
    await connectDB();

    return app(req, res);
  } catch (error) {
    console.error("Database connection error:", error);

    return res.status(500).json({
      success: false,
      message: "Database connection failed"
    });
  }
};

export default handler;