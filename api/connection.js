import mongoose from "mongoose";

const PW = 'rrNefjzLOj9kxQh2'
const BD = 'webstore'
const URI = `mongodb+srv://pf-grupal:${PW}@cluster0.kvgcdue.mongodb.net/${BD}?retryWrites=true&w=majority`

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
