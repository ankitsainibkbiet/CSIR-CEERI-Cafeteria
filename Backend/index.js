import "./Config/LoadEnv.js"
import express from "express"
import { connection } from "./Database/Connection.js"
import cors from "cors"
import passport from "passport"
import LocalStrategy from "passport-local"
import session from "express-session"
import User from "./Models/User.model.js"

await connection()
const app = express()

app.set("trust proxy", 1);

app.use(cors({
    origin: "https://csir-ceeri-cafeteria.vercel.app",
    credentials: true,
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const port = parseInt(process.env.PORT)


app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: 'none',
        httpOnly: true
    }
}))

// Passport Setup :-
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// Import Routers 
import cartRouter from "./Routes/Cart.Routes.js"
import userRouter from "./Routes/User.Routes.js"
import productRouter from "./Routes/Product.Routes.js"
import PaymentRouter from "./Routes/Payment.Routes.js"
import adminRouter from "./Routes/Admin.Routes.js"

// Exicute Routers
app.use("/api/cart", cartRouter)
app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/payment", PaymentRouter)
app.use("/api/admin", adminRouter)

import Product from "./Models/Product.Model.js"
// import { ProductData } from "./Database/ProductData.Init.js"
// Product.insertMany(ProductData)
//     .then(res => console.log(res))
//     .catch(err => console.log(err))

app.get("/", (req, res) => {
    res.send({
        success: true,
        message: "server is running"
    })
})

app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})

