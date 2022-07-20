import Product from "../models/Product.js";
import { uploadImage, deleteImage } from "../librarys/cloudinary.js";
import fs from "fs-extra";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.json(products);
  } catch (e) {
    console.log(e);
  }
};

export const postProduct = async (req, res) => {
  const { name, price, stock, image, category, brands, description, views } =
    req.body;
  let imageUploaded;

  try {
    if (req.files) {
      const result = await uploadImage(req.files.image.tempFilePath);
      await fs.remove(req.files.image.tempFilePath);
      imageUploaded = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    const newProduct = new Product({
      name,
      price,
      stock,
      image: imageUploaded ? imageUploaded : image,
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
    console.log(e);
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
    console.log(e);
  }
};

export const getDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const productDetailed = await Product.findById(id);
    return res.json(productDetailed);
  } catch (e) {
    console.log(e);
  }
};
