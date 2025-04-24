import express from "express";
import { Login, Register } from "../controllers/Auth.js"; // Import Register controller

const AuthRoutes = express.Router();

// Register route
AuthRoutes.post("/register", Register);
AuthRoutes.post("/login", Login);

export default AuthRoutes;
