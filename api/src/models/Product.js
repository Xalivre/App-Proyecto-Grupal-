import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        trim: true
    },
    image: {
    },
    category: [String],
    brands: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
    }
})

export default mongoose.model('Product', productSchema)