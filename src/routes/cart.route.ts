import { Router } from "express";
import { addToCart,getSingleCart,addToQuatity,minusToQuatity } from "../controllers/cart.controller";

const CartRouter: Router = Router();

// Add to cart
CartRouter.post("/add", addToCart);

// get my cart
CartRouter.get("/get/:id", getSingleCart);


// cart inc
CartRouter.put("/inc", addToQuatity);

// cart dec
CartRouter.put("/dec", minusToQuatity);

export default CartRouter;
