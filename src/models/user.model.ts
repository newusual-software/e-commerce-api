import * as mongoose from "mongoose";

const defaultValues = {
	type: String,
	required: true,
	trim: true
}

const UserSchema: mongoose.Schema = new mongoose.Schema({
	fname: {...defaultValues},
	lname: {...defaultValues},
	email: {...defaultValues},
	password: {...defaultValues, trim: false },
},{ timestamps: true });

const User = mongoose.model("User",UserSchema);

export default User;