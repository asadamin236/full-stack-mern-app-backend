import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const testConnection = async () => {
  try {
    // Attempt to connect to MongoDB using the connection string from your .env file
    await mongoose.connect(process.env.MongoDB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Atlas connection successful!");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas", error.message);
  }
};

testConnection();
