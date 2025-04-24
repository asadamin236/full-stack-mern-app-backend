import ProductModel from "../models/product.js";
import mongoose from "mongoose";

// Optional: Basic URL format checker (allows all valid URLs, no file type restriction)
const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};

// ✅ Create product
const ProductCreate = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, des, Img_url } = req.body;

    if (!title || !des || !Img_url || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Validate Img_url format
    if (!isValidUrl(Img_url)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid image URL format" });
    }

    const newProduct = new ProductModel({
      title,
      des,
      Img_url,
      userId,
    });

    await newProduct.save();

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Update product
const Update = async (req, res) => {
  try {
    const ProductId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(ProductId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Product ID" });
    }

    const { title, des, Img_url } = req.body;

    if (!title || !des || !Img_url) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // ✅ Again, accept any valid URL format
    if (!isValidUrl(Img_url)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid image URL format" });
    }

    const FindProduct = await ProductModel.findById(ProductId);

    if (!FindProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      ProductId,
      { title, des, Img_url },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Delete product
const DeleteProduct = async (req, res) => {
  try {
    const ProductId = req.params.id;
    const FindProduct = await ProductModel.findById({ _id: ProductId });

    if (!FindProduct) {
      return res
        .status(404)
        .json({ success: false, message: "No Product Found" });
    }

    const DeletedProduct = await ProductModel.findByIdAndDelete({
      _id: ProductId,
    });

    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
      product: DeletedProduct,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

// ✅ Get all products for user
const GetProducts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const Products = await ProductModel.find({ userId });
    return res.status(200).json({ success: true, Products });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong!" });
  }
};

export { ProductCreate, Update, DeleteProduct, GetProducts }; // <-- Ensure DeleteProduct is exported
