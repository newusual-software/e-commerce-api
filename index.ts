import app from "./src/app";
import * as dotenv from "dotenv";
import connectDB from "./src/configs/db.config";

dotenv.config();

const PORT: string | number = process.env.PORT || 3000;

connectDB()
	.then(() => {
		console.log("DB connected")
		app.listen(PORT,() => console.log("Server running on port....",PORT));
	})
	.catch(error => {
		console.error(error)
	})