import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import Cart from"../models/Cart";
import cloud from "../configs/cloud";
import * as cloudinary from "cloudinary";

// @Des: Get all product
// @Method: GET
// @Access: Public
export const getAllProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q } = req.query;
    if(q){
       const products = await Product.find({ product_cat: q }).sort({ createdAt: -1 });
       return res.status(200).send(products);
    } 
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).send(products);
  } catch (error) {
    next(error);
  }
};

// @Des: Get Single product
// @Method: GET
// @Access: Public
export const getSingleProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).send(product);
  } catch (error) {
    next(error);
  }
};

// @Des: Add product
// @Method: POST
// @Access: Private
export const addProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body) return res.status(400).send("Field are required!");

    const  { product_name,product_des,product_price,product_cat,product_rate } = req.body;

    // upload image to cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file?.path)
        await Product.create({
            product_name,
            product_image: result.secure_url,
            product_des,
            product_price,
            product_cat,
            product_rate
        })
        .then((data) =>
          res.status(201).send(data)
        )
        .catch((error) => console.log("1",error));
    
  } catch (error) {
  console.log(JSON.stringify(error,null,2));
    next(error);
  }
};

// @Des: Remove product
// @Method: DELETE
// @Access: Private
export const removeProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // find product in the cart and delete it
    await Cart.find({ product_id: req.body.id}).deleteMany();
    // find the product by ID and delete
    await Product.findByIdAndDelete(req.body.id)
      .then((data) => res.status(200).send(data?._id))
      .catch((error) =>
        res.status(400).send("An error occured please try again later")
      );
  } catch (error) {
    next(error);
  }
};

// @Des: Update product
// @Method: PUT
// @Access: Private
export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Product.findByIdAndUpdate(req.body.id, req.body, { new: true })
      .then((data) => res.status(200).send(data))
      .catch((error) => console.log(error));
  } catch (error) {
    next(error);
  }
};
