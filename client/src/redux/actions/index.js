import axios from "axios";

export function getProducts() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3000/home", {});
    return dispatch({
      type: "GET_PRODUCTS",
      payload: json.data,
    });
  };
}

export function getProductDetails(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3000/product/" + id);
      let counter = await axios.put("http://localhost:3000/product/" + id, {
        views: json.data.views + 1,
      });
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function sortPrice(price) {
  return {
    type: "SORT_PRICE",
    payload: price,
  };
}

export function sortRating(rating) {
  return {
    type: "SORT_RATING",
    payload: rating,
  };
}

export function deleteProduct(id) {
  return async function (dispatch) {
    let deleted = await axios.delete("http://localhost:3000/product/" + id);
  };
}

export function addToCart(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3000/product/" + id);
      return dispatch({
        type: "ADD_TO_CART",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function deleteFromCart(id){
  return {
    type: 'REMOVE_CART',
    payload: id
  }
}

export function addToWishList(id){
  return async function (dispatch){
    try{
      let json = await axios.get("http://localhost:3000/product/" + id);
      return dispatch({
        type:"ADD_TO_WISHLIST",
        payload:json.data,
      });
    }catch(e){
      console.log(e)
    }
  }
}

export function removeFromWishList(id){
  return{
    type:"REMOVE_WISHLIST",
    payload:id
  }
}

export function filterProducts() {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3000/carousel");
      return dispatch({
        type: "CAROUSEL",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function filterProductsByViews() {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3000/mostViewed");
      return dispatch({
        type: "MOST_VIEWED",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function filterProductsByDate() {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3000/recentlyAdded");
      return dispatch({
        type: "RECENTLY_ADDED",
        payload: json.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function searchName(word) {
  return function (dispatch, getState) {
    // primero hacemos el llamado a nuestra store, en donde tengamos todos los productos

    const allProducts = getState().allProducts; //suponiendo que el arr del store se llame products
    // realizamos el filtrado

    console.log(`estas buscando: ${word}`);
    const res = allProducts.filter((element) => element.name.toLowerCase().includes(word.toLowerCase())); 
    dispatch({
      type: "SEARCH_BAR",
      payload: word,
    });
    console.log(res)
  };
}

export function postProduct(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3000/createProduct", payload) 
    return response
  }
}

export function getCategories() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3000/categories", {});
    return dispatch({
      type: "GET_CATEGORIES",
      payload: json.data,
    });
  };
}

export function getBrands() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3000/brands", {});
    return dispatch({
      type: "GET_BRANDS",
      payload: json.data,
    });
  };
}

// export function clearPage(){
//   return {
//       type:"CLEAR_PAGE"
// }

export function recategorization(){
  
}

