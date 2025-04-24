import UserModel from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Register Controller
const Register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Check if all fields are provided
    if (!userName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists, please login",
      });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create new user
    const newUser = new UserModel({
      userName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Return success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Login Controller
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find the user by email
    const FindUser = await UserModel.findOne({ email });

    // Check if the user exists
    if (!FindUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found, please register" });
    }

    // Compare the entered password with the stored hashed password
    const checkPassword = await bcryptjs.compare(password, FindUser.password);

    // If password doesn't match, send an error
    if (!checkPassword) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid Password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: FindUser._id, email: FindUser.email },
      process.env.JWT_SECRET, // Your secret key from .env
      { expiresIn: "1h" } // Token expiry time
    );

    // If login is successful, return the user and the token
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: FindUser,
      token, // Send JWT token in response
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export { Register, Login };
