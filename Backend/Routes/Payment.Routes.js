import express from "express";
import Razorpay from "razorpay";
import Order from "../Models/Order.Model.js"
import User from "../Models/User.model.js"
import crypto from "crypto";

const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post("/create-order", async (req, res) => {
    const { amount } = req.body; // amount in rupees

    try {
        const order = await razorpay.orders.create({
            amount: amount * 100, // ₹50 → 5000 paise
            currency: "INR",
            payment_capture: 1
        });

        res.json({ success: true, order });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

router.post("/verify", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = req.user._id;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) return res.status(400).json({ success: false, message: "Invalid signature" });

    // Get user + cart
    const user = await User.findById(userId);
    const cartItems = user.cart;

    // Save order
    const order = new Order({
        userId,
        items: cartItems,
        totalAmount: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        status: "Pending",
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        signature: razorpay_signature
    });

    await order.save();

    // Clear cart
    user.cart = [];
    await user.save();

    res.json({ success: true, message: "Order placed successfully!" });
});


export default router;