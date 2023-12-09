import { Router } from "express";
import {
  getAllProduct,
  addProduct,
  getSingleProduct,
  removeProduct,
  updateProduct
} from "../controllers/product.controller";
import upload from "../middleware/uploads";

const productRouter: Router = Router();

// Get all products
productRouter.get("/", getAllProduct);

// Get Single product
productRouter.get("/get/:id", getSingleProduct);

// Add product
productRouter.post("/add", upload.single("product_image"), addProduct);

// remove product
productRouter.delete("/remove", removeProduct);

// update product
productRouter.put("/update", updateProduct);

export default productRouter;
