import * as mongoose from "mongoose";

const OrderSchema: mongoose.Schema = new mongoose.Schema({
	user_id: {
		type: mongoose.Schema.SchemaTypes.ObjectId,
		ref: "User",
	},
	product_id: {
		type: mongoose.Schema.SchemaTypes.ObjectId,
		ref: "Product",
	}
},{ timestamps: true });

const Order = mongoose.model("Order",OrderSchema);

export default Order;