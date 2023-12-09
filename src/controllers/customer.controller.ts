import { Request, Response, NextFunction } from "express";
import Customer from "../models/Customer";
import bcrypt from "bcrypt";

// @Dec: Create account
// @Access: Public
// @Method: POST
export const createAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).send("Credentials are required!");
    }

    // first check if email does not exit
    const check = await Customer.findOne({ email });
    if (check)
      return res.status(409).send("Account with this email has already exit");

    // hashed password
    const hashPassword = await bcrypt.hash(password, 13);

    await Customer.create({
      first_name,
      last_name,
      email,
      password: hashPassword,
    })
      .then((data) => res.status(201).send("Account created"))
      .catch((error) => console.log(error));
  } catch (error) {
    next(error);
  }
};

// @Dec: Login
// @Access: Private
// @Method: POST

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // validation

    const { email, password: pass } = req.body;

    if (!email || !pass)
      return res.status(400).send("Email or Password is required");

    // check if user exit
    const userCheck = await Customer.findOne({ email });
    if (userCheck) {
      const verifyPassword = await bcrypt.compare(pass, userCheck.password);
      if (verifyPassword) {
        const { password, createdAt, updatedAt, ...others } = userCheck._doc;
        return res.status(200).send(others);
      } else {
        return res.status(401).send("Invalid Email or password is invalid");
      }
    } else {
      return res.status(401).send("Invalid Email or password is invalid");
    }
  } catch (error) {
    next(error);
  }
};

// get all customers/users
export const getAllCustomers = async (req: Request,res: Response,next: NextFunction) => {
  try{

    const customers = await Customer.find();
    return res.status(200).send(customers);

  } catch(error){
    next(error);
  }
}

// update profile
export const updateProfile = async (req: Request,res: NextFunction,next: NextFunction) => {
  try{

    const customer = await Customer.findById(req.body.id);

    if(customer){

      customer.first_name = req.body.fname;
      customer.last_name = req.body.lname;

      const saved = await customer.save();

      if(saved){
        const { password, createdAt, updatedAt, ...others } = customer._doc;
        return res.status(200).send(others)
      } else {
        return res.status(400).send("An error occured please try again later");
      }

    } else {
      return res.status(404).send("Customer not found!");
    }

  } catch(error){
    next(error);
  }
}
