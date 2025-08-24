import express from "express";
import User from "../Models/User.model.js";
import Product from "../Models/Product.Model.js"
import { isAuthenticated } from "../Middlewares/Auth.Middlewear.js";


const router = express.Router();

// GET /api/cart
router.get("/", isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({ success: true, cart: user.cart });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch cart." });
    }
});

// Add to Cart
router.post("/add", isAuthenticated, async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const user = await User.findById(userId);

    // Check if product already in cart
    const existing = user.cart.find((item) => item.productId.equals(productId));
    if (existing) {
        existing.quantity += quantity ; // inc the quantity
    } else {
        user.cart.push({
            productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity
        });
    }

    await user.save();
    res.status(200).json({ success: true, cart: user.cart });
});

// DELETE /api/cart/remove/:productId
router.delete("/remove/:productId", isAuthenticated, async (req, res) => {
    try {
        const { productId } = req.params;
        const user = await User.findById(req.user._id);

        user.cart = user.cart.filter((item) => item.productId.toString() !== productId);

        await user.save();

        res.status(200).json({ success: true, cart: user.cart });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to remove item from cart." });
    }
});



export default router;