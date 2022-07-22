import Product from "../models/Product.js";

export const getCarousel = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length > 5) {
      var productsFiltered = [];
      var indexArray = [];

      for (let i = 0; i < 5; i) {
        let randomNumber = Math.floor(Math.random() * products.length);
        if (!indexArray.includes(randomNumber)) {
          indexArray.push(randomNumber);
          productsFiltered.push(products[randomNumber]);
          i++;
        }
      }
      return res.json(productsFiltered);
    }
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const insertionSort = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length > 5) {
    for (let i = 1; i < products.length; i++) {
      let j = i - 1;
      let aux = products[i];
      while (j >= 0 && aux.views < products[j].views) {
        products[j + 1] = products[j];
        j--;
      }
      products[j + 1] = aux;
    }

    return res.json(
      products.slice(products.length - 5, products.length).reverse()
    );
    }
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};

export const lastAdded = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length > 5) {
    const lastAdded = products
      .slice(products.length - 5, products.length)
      .reverse();
    return res.json(lastAdded);
    }
  } catch (e) {
    return res.json({ msg: `Error 404 - ${e}` });
  }
};
