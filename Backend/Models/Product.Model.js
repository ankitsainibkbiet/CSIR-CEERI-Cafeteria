import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    Quantity: {
        type: Number,
        required: true,
        default: 1
    },
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

export default Product