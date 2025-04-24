import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import DbConn from "./libs/Db.js"; // DB connection
import AuthRoutes from "./routes/Auth.js"; // Auth routes
import ProductRoutes from "./routes/Product.js"; // Product routes

dotenv.config(); // Load .env variables

const app = express();
const Port = process.env.PORT || 4000;

// ✅ Connect to MongoDB
DbConn();

// ✅ Middlewares
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend to make requests
    credentials: true, // Allow cookies and authentication headers
  })
);
app.use(express.json());

// ✅ Routes
app.use("/auth", AuthRoutes);
app.use("/products", ProductRoutes);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("🚀 Your App is Running Now");
});

// ✅ Global error handler (optional but clean)
app.use((err, req, res, next) => {
  console.error("❌ Internal Error:", err.stack);
  res.status(500).send("Something went wrong!");
});

// ✅ Start server
app.listen(Port, () => {
  console.log(`✅ Server running at http://localhost:${Port}`);
});
