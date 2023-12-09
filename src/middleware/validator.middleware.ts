import { Request,Response, NextFunction } from "express";
import { registerVal,loginValidator } from "../utils/validator.util";

// register validator middleware
function registerValidatorM(req: Request,res: Response, next: NextFunction){
	const { error,value } = registerVal.validate(req.body);

	if(error){
		return res.status(422).send({ message: error.details[0].message });
	}

	req.body = value;
	next();
}

// login validator middleware
function loginValidatorM(req: Request,res: Response, next: NextFunction){
	const { error,value } = loginValidator.validate(req.body);

	if(error){
		return res.status(422).send({ message: error.details[0].message });
	}

	req.body = value;
	next();
}

export { registerValidatorM,loginValidatorM }