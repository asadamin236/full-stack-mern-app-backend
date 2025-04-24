import express from "express";
import {
  DeleteProduct,
  GetProducts,
  ProductCreate,
  Update,
} from "../controllers/Product.js"; // Correct import for ProductCreate controller

const ProductRoutes = express.Router();

// POST route to create a new product
ProductRoutes.post("/create/:userId", ProductCreate);

// PUT route to update an existing product
ProductRoutes.put("/update/:id", Update);

// Delete route to remove product from database
ProductRoutes.delete("/delete/:id", DeleteProduct);

// Get All Products From Database
ProductRoutes.get("/getProducts/:userId", GetProducts);

export default ProductRoutes;