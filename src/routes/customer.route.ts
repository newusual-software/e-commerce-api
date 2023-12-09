import { Router } from "express";
import {
  createAccount,
  loginUser,
  getAllCustomers,
  updateProfile,
  getMyProfile
} from "../controllers/customer.controller";

const CustomerRouter: Router = Router();

// @Dec: create account
// @Method: POST
// @Access: Public
CustomerRouter.post("/create", createAccount);

// @Dec: Login user
// @Method: POST
// @Access: Private
CustomerRouter.post("/login", loginUser);

// get All users
CustomerRouter.get("/customers",getAllCustomers);

// update profile
CustomerRouter.put("/update/profile", updateProfile);

export default CustomerRouter;
