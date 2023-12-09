import * as dotenv from "dotenv";
import express,{ Express } from "express";
import helmet from "helmet";
import path from "path";
import cors from "cors";
import { routeNotFound,errorHandler } from "./middleware/handler.middleware";
import CustomerRouter from "./routes/customer.route";
import productRouter from "./routes/product.router";
import CartRouter from "./routes/cart.route";
import CategorieRouter from "./routes/categorie.route";

const PORT = process.env.PORT || 3000;

const app: Express = express();

// middlewares
app.use(express.static(path.join(__dirname,"../","public")));
app.use(helmet());
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes

app.use("/", CustomerRouter);
app.use("/product", productRouter);
app.use("/cart", CartRouter);
app.use("/cartegorie", CategorieRouter);

// page not found
app.use(routeNotFound);

// error handler
app.use(errorHandler);

export default app;
