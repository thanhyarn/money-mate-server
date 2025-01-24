const mongoose = require("mongoose");
require("dotenv").config(); // Load biến môi trường từ .env

async function connect() {
  try {
    // Sử dụng biến MONGO_URI từ tệp .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection error:", error);
  }
}

module.exports = { connect };
