import mongoose from "mongoose";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";

export const addProductToCart = async (req, res) => {
    const {id} = req.params;
    const {idCart} = req.query;

    try{
        const product = await Product.findById(id)

        if(idCart){
            const cart = await Cart.findById(idCart);
            if(!cart) return res.json({msg: "Cart not found"});
            cart.items.push(product);
            cart.save();
            return res.json({msg:"Added"});
        }
        const newCart = new Cart({
            items: product
        })

        await newCart.save();
        return res.json({msg: "Added"})
    }catch(e){
        return res.json({msg: `Error 404 - ${e}`});
    }
}


export const cartItems = async (req, res) => {
    try{
        const result = await Cart.find({})
        if(result.length === 0) return res.json({msg: "Cart it empty"})
        return res.json(result);
    }catch(e){
        return res.json({msg: `Error 404 - ${e}`});
    }
}

export const deleteItems = async (req, res) => {
    const {id} = req.params; 
    const {idCart} = req.query; 

    try{
        const cart = await Cart.findById(idCart); 
        if(cart.items.length === 1){
             await Cart.findByIdAndDelete(idCart)
        } else {
            const cartFiltered = cart.items.filter(e => e._id.toString() !== id) 
            cart.items = cartFiltered
            cart.save();  
        }
        return res.json({msg: "Removed product"})
    }catch(e){
        return res.json({msg: `Error 404 - ${e}`}); 
    }
}
