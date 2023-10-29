import express,{ Express } from "express";
import helmet from "helmet";
import path from "path";
import cors from "cors";
import userRouter from "./routes/user.route";
import * as handlers from "./middlewares/handler.middleware";

const app: Express = express();

// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname,"../","public")));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

// routes
app.use("/api/v1/",userRouter);


// route not found
app.use(handlers.routeNotFound)

// error handler
app.use(handlers.errorHandler)
export default app;