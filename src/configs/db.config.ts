import * as mongoose from "mongoose";

async function connectDB(){
	return await mongoose.connect(process.env.NODE_ENV as string === "development" ? process.env.DB as string: process.env.GB as string);
}

export default connectDB;