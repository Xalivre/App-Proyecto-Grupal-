import express from 'express';
import { connectDB } from './connection.js'
import productRoutes from './routes/product-routes.js' 
import dotenv from "dotenv"

dotenv.config()


const PORT = process.env.PORT || 3000
export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:testdb"



const app = express();
app.use(express.json())
app.use(productRoutes)


connectDB()
app.listen(PORT);

console.log('Server listening on port', PORT);


