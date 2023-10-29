import { Router } from "express";
import { loginUser,signUser } from "../controllers/user.controller";
import { registerValidatorM,loginValidatorM } from "../middlewares/validator.middleware";

const userRouter: Router = Router();

// login user
userRouter.post("/login",loginValidatorM,loginUser);

// sign up user
userRouter.post("/register",registerValidatorM,signUser);

export default userRouter;