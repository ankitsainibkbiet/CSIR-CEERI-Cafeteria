import express from "express";
import User from "../Models/User.model.js";
import Order from "../Models/Order.Model.js"
import {isAuthenticated} from "../Middlewares/Auth.Middlewear.js"
import passport from "passport";

const router = express.Router()

router.get("/auth", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ success: true, user: req.user });
    } else {
        res.json({ success: false, message: "User not Authenticated" });
    }
});

router.post("/signup", async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username });
        await User.register(user, password);
        // Auto-login after signup
        req.login(user, (err) => {
            if (err) return res.json({ success: false, message: "registration failed", user });;
            return res.status(201).json({
                success: true,
                message: "User registered and logged in successfully",
                user: req.user
            });
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.status(401).json({ success: false, message: info?.message || "Login failed" });
        }
        req.logIn(user, (err) => {
            if (err) return res.json({ success: false, message: "Logged in failed", user });
            return res.json({ success: true, message: "Logged in successfully", user });
        });
    })(req, res, next);
});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.json({ success: true, message: "Logged out successfully" });
    });
});

router.get("/orders", isAuthenticated, async (req, res) => {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
});


export default router;