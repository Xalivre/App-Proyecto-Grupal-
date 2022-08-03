import axios from "axios";
import swal from 'sweetalert';

export function getProducts() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3000/home", {});
    return dispatch({
      type: "GET_PRODUCTS",
      payload: json.data,
    });
  };
}

export function getUsers() {
  return async function (dispatch) {
    let json = await axios.get("http://localhost:3000/accounts", {})
    return dispatch({
      type: "GET_USERS",
      payload: json.data
    })
  }
}

export function getUserPayments(email) {
  return async function (dispatch) {
    let r = await axios.get("http://localhost:3000/api/checkoutEmail?email=" + email)
    return dispatch({
      type: "GET_USER_PAYMENTS",
      payload: r.data
    })
  }
}

export function getProductDetails(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3000/product/" + id);
      await axios.put("http://localhost:3000/product/" + id, {
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

export function getPaymentHistory(id) {
  return async function (dispatch){ 
    let json = await axios.get("http://localhost:3000/api/paymentHistory/" + id)
    return dispatch({
      type: "GET_PAYMENT_HISTORY",
      payload: json.data
    })
  }
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
    await axios.delete("http://localhost:3000/product/" + id);
  };
}

export function addToCart(id) {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3000/product/" + id);
      if(json.data.stock > 0) {
        swal("Listo!","El producto fue agregado al carrito!","success")
        return dispatch({
          type: "ADD_TO_CART",
          payload: json.data,
        });
      }
      return swal("Lo siento","No hay stock disponible de este producto","error")
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

export function modifyCart(carrito){
  return {
    type: "MODIFY_CART",
    payload: carrito
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

    allProducts.filter((element) => element.name.toLowerCase().includes(word.toLowerCase())); 
    dispatch({
      type: "SEARCH_BAR",
      payload: word,
    });
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

export function clearPage(){
   return {
      type:"CLEAR_PAGE"
 }
}

export function postUser(payload) {
  return async function (dispatch) {
    const response = await axios.post("http://localhost:3000/register", payload) 
    return response
  }
}

export function postUsersGoogle(payload){
  return async function (dispatch){
    const responseGoogle = await axios.post("http://localhost:3000/registerGoogle", payload)
    return responseGoogle
  }
}

export function editProduct(payload, id) {
  return async function (dispatch) {
    const edit = await axios.put("http://localhost:3000/product/" + id, payload)
    return edit
  }
}

export function updateUserState(payload, id) {
  return async function (dispatch) {
    const ban = await axios.put("http://localhost:3000/accounts/" + id, payload)
    return ban
  }
}


export function adminUser(payload, id) {
  return async function (dispatch) {
    const ban = await axios.put("http://localhost:3000/accounts/" + id, payload)
    return ban
  }
}

export function loginRefresher() {
  return function (dispatch) {
    dispatch({
      type: "LOGIN_REFRESHER"
    })
  }
}

export function modifyQuantityUp(id) {
  return function (dispatch) {
    dispatch({
      type: "MODIFY_QUANTITY_UP",
      payload: id
    })
  }
}

export function modifyQuantityDown(id) {
  return function (dispatch) {
    dispatch({
      type: "MODIFY_QUANTITY_DOWN",
      payload: id
    })
  }
}

export function changeState(payload) {
  console.log(payload)
  return async function (dispatch){

    const updated = await axios.put("http://localhost:3000/updatestate", payload)
    return updated
  }
}


