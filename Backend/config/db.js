const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri =
      process.env.MONGO_URI ||
      "mongodb+srv://sanskarchaurasia456_db_user:U0jOPcaxJ81lJEee@cluster0.qbry2kd.mongodb.net/?appName=Cluster0";
    await mongoose.connect(uri);
    console.log("MongoDB connected:", uri);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
