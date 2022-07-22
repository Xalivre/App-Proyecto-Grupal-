import Product from "../models/Product.js";
import { uploadImage, deleteImage } from "../librarys/cloudinary.js";
import fs from "fs-extra";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (e) {
    return res.json({msg: `Error 404 - ${e}`});
  }
};

export const postProduct = async (req, res) => {
  const { name, price, stock, image, category, brands, description, views } = req.body;
  let imageUploaded;
  let resultImages;
  let arrayURLS

  try {
    if (req.files) {
      if(req.files.image.length > 0) {
        resultImages = req.files.image.map(image => uploadImage(image.tempFilePath))
        req.files.image.map(image => fs.remove(image.tempFilePath))
        
        const arrayPromiseURLS = await Promise.all(resultImages)
        arrayURLS = arrayPromiseURLS.map(image => {
          return imageUploaded = {
            url: image.secure_url,
            public_id: image.public_id
          }
        })    
      }
    
      else {
        const result = await uploadImage(req.files.image.tempFilePath);
        await fs.remove(req.files.image.tempFilePath);
        imageUploaded = {
          url: result.secure_url,
          public_id: result.public_id,
        };
      }
    }

    const newProduct = new Product({
      name,
      price,
      stock,
      image: arrayURLS ? arrayURLS : imageUploaded ? imageUploaded : {url: image}, 
      category,
      brands,
      description,
      views,
    });

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
    if (!deletedProduct) return res.send("Product not found");
    if (deletedProduct.image.length > 0) {
      deletedProduct.image?.map(product => deleteImage(product.public_id))
    }
    if (deletedProduct.image.public_id) {
      await deleteImage(deletedProduct.image.public_id);
    }
    return res.send("Product Deleted");
  } catch (e) {
    console.log(e);
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedProduct) return res.send("Product not found");
    return res.send("Product Updated");
  } catch (e) {
    return res.json({msg: `Error 404 - ${e}`});
  }
};

export const getDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const productDetailed = await Product.findById(id);
    return res.json(productDetailed);
  } catch (e) {
    return res.json({msg: `Error 404 - ${e}`});
  }
};

export const getCarousel = async (req, res) => {
  try {
    const products = await Product.find();
    var productosFiltrados = [];
    var indexArray = [];

    for (let i = 0; i < 5; i) {
      let numeroRandom = Math.floor(Math.random() * products.length);
      if (!indexArray.includes(numeroRandom)) {
        indexArray.push(numeroRandom);
        productosFiltrados.push(products[numeroRandom]);
        i++;
      }
    }
    return res.json(productosFiltrados);
  } catch (e) {
    return res.json({msg: `Error 404 - ${e}`});
  }
};


export const insertionSort = async (req, res) => {
  
  try{
    const products = await Product.find();
    for (let i = 1; i < products.length; i++) {
        let j = i - 1;
        let aux = products[i];
        while (j >= 0 && aux.views < products[j].views) {
          products[j + 1] = products[j];
          j--;
        }
        products[j + 1] = aux;
      }
  
      return res.json(products.slice(products.length -5, products.length))
  } catch (e) {
    return res.json({msg: `Error 404 - ${e}`});
    }
  } 

  export const lastAdded= async (req, res) => {
    try{
      const products = await Product.find();
      return res.json(products.slice(products.length - 5, products.length));
    }catch(e){
      return res.json({msg: `Error 404 - ${e}`});
    }
  }