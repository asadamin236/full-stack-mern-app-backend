import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true, // Make sure userName is required
    },
    email: {
      type: String,
      required: true, // Make sure email is required
      unique: true, // Email should be unique
    },
    password: {
      type: String,
      required: true, // Make sure password is required
    },
  },
  {
    timestamps: true,
  }
);

// Create a model from the schema
const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
