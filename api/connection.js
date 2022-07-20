import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const URI = `mongodb+srv://pf-grupal:${process.env.PW}@cluster0.kvgcdue.mongodb.net/${process.env.BD}?retryWrites=true&w=majority`

export async function connectDB() {
  try {
    const db = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.onOpen('open', _ => {
      console.log("Connected to", db.connection.name)
    })
    
  } catch (e) {
    console.log(e);
  }
}
