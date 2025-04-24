import mongoose from "mongoose";

const DbConn = () => {
  try {
    // Connect to MongoDB using the URL from environment variable
    mongoose.connect(process.env.MongoDB_URL);
    console.log("MongoDB Database Connected");
  } catch (error) {
    console.log("MongoDB Connection Error", error);
  }
};

export default DbConn;
