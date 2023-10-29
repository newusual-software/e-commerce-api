import { Request,Response,NextFunction } from "express";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import User from "../models/user.model";

// login user
async function loginUser(req: Request, res: Response, next: NextFunction){
	try{
		const { email,password: pass } = req.body;

		// check if email does not exits
		const checkEmail = await User.findOne({ email });
		if(!checkEmail) return res.status(400).send({ message: "Invalid email or password" });

		// check if password is valid
		const checkPassword = await bcrypt.compare(checkEmail.password,pass);
		if(!checkPassword) return res.status(400).send({ message: "Invalid email or password" });

       // generate token
		const token = jwt.sign({ _id: checkEmail._id, email }, process.env.KEY as string);

		// remove pasword from the recieve data
		const { password,...others } = checkEmail._doc;

		// return logged in user
		return res.status(200).send({ ...others, token });

	} catch(error: unknown){
		next(error);
	}
}


// sign up user
async function signUser(req: Request, res: Response, next: NextFunction){
	try{

	const { fname,lname,email,password } = req.body;

	// check if user exit with the given email
	const user = await User.findOne({ email });
	if(user) return res.status(400).send({ message: `An account already exit with this ${email} email` });

	// hash password
	const hashPassword = await bcrypt.hash(password,13); 

	// create account
	const saveUser = new User({
		fname,
		lname,
		email,
		password: hashPassword
	});

	if(saveUser){
		const { password,...others } = saveUser._doc;
		return res.status(201).send({...others });
	} else {
		return res.status(400).send({ message: "An error occured while creating account please try again later"});
	}

	} catch(error: unknown){
		next(error);
	}
}

export { loginUser,signUser }