// routes/admin.js
import express from "express";
import Order from "../Models/Order.Model.js";
import { isAuthenticated } from "../Middlewares/Auth.Middlewear.js";

const router = express.Router();

// GET all orders (admin only)
router.get("/orders", isAuthenticated, async (req, res) => {
    try {
        // Check if user is admin (replace with your actual admin ID or role check)
        if (req.user._id.toString() !== "68bd0da4552a25f5e8729511") {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        const orders = await Order.find({}).populate("userId", "username email").sort({createdAt: -1});
        res.json({ success: true, orders });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

// PATCH update status
router.patch("/orders/:id", isAuthenticated, async (req, res) => {
    if (req.user._id.toString() !== "68bd0da4552a25f5e8729511") {
        return res.status(403).json({ error: "Access denied" });
    }

    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });

    res.json({ success: true, order });
});

export default router;
