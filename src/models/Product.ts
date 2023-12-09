import { Schema, model } from "mongoose";

const ProductSchema: Schema = new Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    product_des: {
      type: String,
      required: true,
    },
    product_image: {
      type: String,
      required: true,
    },
    product_cat: {
      type: String,
      required: true,
    },
    product_rate: {
      type: Number,
      required: true,
    },
    product_total: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = model("Product", ProductSchema);
export default Product;