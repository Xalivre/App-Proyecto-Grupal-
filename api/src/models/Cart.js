import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    items:[],
    date:{
        type: Date, 
        default: Date.now
    },
})

export default mongoose.model('Cart', cartSchema)