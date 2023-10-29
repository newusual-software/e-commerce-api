import Joi from "joi";

// login validator
const loginValidator = Joi.object().keys({
	email: Joi.string().required(),
	password: Joi.string().required()
});

// sign up
const registerVal = Joi.object().keys({
	fname: Joi.string().required(),
	lname: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).required(),
})

export { loginValidator,registerVal }