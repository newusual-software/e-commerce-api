import { Schema, model } from "mongoose";

const CartSchema: Schema = new Schema(
  {
    customer_id: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },
    product_id: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    product_quatity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

const Cart = model("Cart", CartSchema);
export default Cart;