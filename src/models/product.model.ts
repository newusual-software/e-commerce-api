import * as mongoose from "mongoose";


const ProductSchema: mongoose.Schema = new mongoose.Schema({
	product_image: {
		type: String,
		trim: true,
		default: "product.png",
	},
	description: {
		type: String,
		trim: true,
	},
	updated_by: {
		type: String,
		trim: true,
	},
	product_count: {
		type: Number,
		default: 1 
	},
	isActive: {
		type: Boolean,
		default: true,
	}
},{ timestamps: true });

const Product = mongoose.model("Product",ProductSchema);

export default Product;