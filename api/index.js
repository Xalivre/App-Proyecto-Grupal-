import express from 'express';
import fileUpload from 'express-fileupload';
import Stripe from 'stripe';
import { connectDB } from './connection.js';
import productRoutes from './src/routes/product-routes.js';
import userRoutes from "./src/routes/user-routes.js";
import cartRoutes from "./src/routes/cart-routes.js";
import filtersRoutes from "./src/routes/filters-routes.js";
import brandsRoutes from "./src/routes/brands-routes.js"; 
import cagetoriesRoutes from "./src/routes/categories-routes.js";

import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe("sk_test_51LPtrNLlcvSwUKGvA46HsDBeocgeeQRHsWSLTAQeyTzHzZrTk18ml4stPalgNse5zyOObM5fLFc3yNsnmSgHnbcl00y02QLl7l")
const port = process.env.PORT || 3000
const host = process.env.HOST || "0.0.0.0"
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://pf-grupal:rrNefjzLOj9kxQh2@cluster0.kvgcdue.mongodb.net/?retryWrites=true&w=majority"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))
app.use(cors());
app.use(productRoutes);
app.use(userRoutes);
app.use(cartRoutes);
app.use(filtersRoutes);
app.use(brandsRoutes)
app.use(cagetoriesRoutes)

app.post("/api/checkout", async (req, res) => {
    try {
        const {id, amount} = req.body

    const payment = await stripe.paymentIntents.create({
        amount, 
        currency: "USD",
        description: "Gaming buyy",
        payment_method: id,
        confirm: true
    })

    console.log(payment)
    res.send({message: "Succesfull payment"})
    } catch (error) {
        console.log(error)
        res.json({message: error.raw.message})
    }
})

connectDB();
app.listen(port, host, () => {
    console.log('Server listening on port', port);
});


