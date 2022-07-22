import mongoose from "mongoose";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
// import User from "../models/User.js";

export const addProductToCart = async (req, res) => {
    const {id} = req.params;
    const {idCart} = req.query;

    try{
        const product = await Product.findById(id)

        if(idCart){
            const cart = await Cart.findById(idCart);
            if(!cart) return res.send("no existe");
            cart.items.push(product);
            cart.save();
            return res.send("Added");
        }
        const newCart = new Cart({
            items: product
        })
        await newCart.save();
        return res.send("Added")
    }catch(e){
        return res.json({msg: `Error 404 - ${e}`});
    }
}


export const CartItems = async (req, res) => {
    try{
        
        const result = await Cart.find({})
        if(result.length === 0) return res.send("Vacio")
        return res.json(result);
    }catch(e){
        return res.json({msg: `Error 404 - ${e}`});
    }
}

export const deleteItems = async (req, res) => {
    const {id} = req.params; //producto
    const {idCart} = req.query; //cart

    try{
        const cart = await Cart.findById(idCart); //selecciona el modelo de Cart para poder elminar el producto dentro de esa CART
        if(cart.items.length === 1){
             await Cart.findByIdAndDelete(idCart)
        } else {
            const cartFiltrada = cart.items.filter(e => e._id.toString() !== id) //ES UN ARRAY que trae todo lo que es distinto al producto a eliminar
            cart.items = cartFiltrada // remplazo el viejo items por el array con el producto eliminado
            cart.save();  //guardo cambios
        }
        
        
        return res.send("SE BORRO")
    }catch(e){
        return res.json({msg: `Error 404 - ${e}`}); 
    }
}






/*
---------------------*Cada usuario cuando se logea se le asocia un carrito*  **todavia no se**





CARRITO GEENRAL =>  CALCULADORA preview precio a comprar 

carrito Arayy de produtco

armar un post por cada producto que clickeas en el "add al carrito" y se pushee a items
Post con Id 




1. SUMAR AL CARRITO --> POST

llenar el array de items 

(producto que se requiere x id del producto vaya a la propiedad items)

hacer  la relacion Cart(item:[producto]) con User(nombre a)

const Pago = await Cart.find({}).populate("User", {
    username: 1,
    email: 1,
})

return res.send(Pago)

*/
