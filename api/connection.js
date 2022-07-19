import mongoose from "mongoose";
import {MONGODB_URI} from "./index.js"



export async function connectDB() {
  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
     /*  useCreateIndex: true, */
    });
    mongoose.connection.onOpen('open', _ => {
      console.log("Connected to", db.connection.name)
    })
    
  } catch (e) {
    console.log(e);
  }
}
