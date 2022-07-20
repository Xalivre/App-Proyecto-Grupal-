import Product from "../models/Product.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (e) {
    console.log(e);
  }
};

export const postProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    return res.json(newProduct);
  } catch (e) {
    console.log(e);
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    return res.send("Product Deleted");
  } catch (e) {
    console.log(e);
  }
};

export const updateProduct = async (req, res) => {
 const { id } = req.params
  try{
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {new: true});
    return res.send('Product Updated');
  } catch(e){
    console.log(e);
  }
}

export const getCarrusel = async (req, res) => {
  try{
    const products = await Product.find(); 
    var productosFiltrados = [];
    var indexArray = [];

    for(let i = 0 ; i < 5; i) {
      let numeroRandom = Math.floor(Math.random() * products.length);

      if(!indexArray.includes(numeroRandom)){
        indexArray.push(numeroRandom);
        productosFiltrados.push(products[numeroRandom]);
        i++; 
      };
    }
    return res.json(productosFiltrados);
  }catch(e){
    console.log(e);
  }
}