import express from 'express';
import fileUpload from 'express-fileupload';
import { connectDB } from './connection.js';
import productRoutes from './src/routes/product-routes.js';
import userRoutes from "./src/routes/user-routes.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:testdb"

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))
app.use(productRoutes);
app.use(userRoutes);

connectDB();
app.listen(PORT);

console.log('Server listening on port', PORT);


