import express from "express";
import Product from "../Models/Product.Model.js";
import { isAuthenticated } from "../Middlewares/Auth.Middlewear.js";
import upload from "../Middlewares/Multer.Middlewear.js"

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        const data = await Product.find({})
        res.json(data)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ success: false, message: err.message })
    }
})

router.post("/create", isAuthenticated, upload.single("image"), async (req, res) => {
    try {
        const { name, price, quantity } = req.body;
        if (!req.file || !req.file.path) {
            return res.status(400).json({ success: false, message: "Image upload failed" });
        }
        const product = new Product({
            name,
            price,
            quantity,
            image: req.file.path, // this is the Cloudinary image URL
        });
        await product.save();
        res.status(201).json({ success: true, product });
    } catch (err) {
        console.error("Product creation error:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get("/:id", async (req, res) => {
    try {
        let productName = req.params.id
        productName = productName.replaceAll('-', ' ').replaceAll('&', '/')
        console.log(productName)
        const product = await Product.findOne({name: productName});
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, product });
    } catch (err) {
        console.error("Error fetching product:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.put("/:id", isAuthenticated, upload.single("image"), async (req, res) => {
    try {
        const { name, price } = req.body;
        const updatedData = { name, price };
        if (req.file && req.file.path) {
            updatedData.image = req.file.path; // Cloudinary URL
        }
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updatedData,
        );
        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, message: "product is updated"});
    } catch (err) {
        console.error("Error updating product:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.json({ success: true, message: "Product deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router