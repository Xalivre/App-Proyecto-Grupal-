import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    paymentHistory: [],
    role: {
        type: String,
        default: "user"
    },
    phoneNumber: {
        type: Number,
    },
    zipCode:{
        type: Number,
    },
    address: {
        type: String,
    },
    location:{
        type: String,
    },
    accountState: {
        type: String,
        default: "active"
    }


})

export default mongoose.model('User', userSchema)