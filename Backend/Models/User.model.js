import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    name: String,
    price: Number,
    image: String,
    quantity: Number
}, { timestamps: true });

const userSchema = new mongoose.Schema({
    cart: [cartItemSchema]
}, { timestamps: true });

userSchema.plugin(passportLocalMongoose);

export default mongoose.model("User", userSchema);
