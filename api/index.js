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


connectDB();
app.listen(port, host, () => {
    console.log('Server listening on port', port);
});


