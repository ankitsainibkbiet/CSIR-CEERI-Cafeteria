// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            productId: mongoose.Schema.Types.ObjectId,
            name: String,
            image: String,
            price: Number,
            quantity: Number
        }
    ],
    totalAmount: Number,
    status: { type: String, default: "Pending" },
    paymentId: String,
    orderId: String,
    signature: String,
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
