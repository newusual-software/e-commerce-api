"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const validator_middleware_1 = require("../middlewares/validator.middleware");
const userRouter = (0, express_1.Router)();
userRouter.post("/login", validator_middleware_1.loginValidatorM, user_controller_1.loginUser);
userRouter.post("/register", validator_middleware_1.registerValidatorM, user_controller_1.signUser);
exports.default = userRouter;
