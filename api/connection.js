import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = `mongodb+srv://pf-grupal:rrNefjzLOj9kxQh2@cluster0.kvgcdue.mongodb.net/?retryWrites=true&w=majority`

export async function connectDB() {
  try {
    const db = await mongoose.connect("mongodb+srv://pf-grupal:rrNefjzLOj9kxQh2@cluster0.kvgcdue.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.onOpen('open', _ => {
    })
    
  } catch (e) {
    console.log(e);
  }
}
