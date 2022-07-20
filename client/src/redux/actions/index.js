import axios from "axios"

export function getProducts() {
    return async function (dispatch) {
        let json = await axios.get("http://localhost:3001/products", {})
        return dispatch({
            type: "GET_PRODUCTS",
            payload: json.data
        })
    }
}

export function getProductDetails(id) {
    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/products/" + id)
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            })
        }
        catch (e) {
            console.log(e)
        }
    }
}

export function sortPrice(price) {
    return {
        type: "SORT_PRICE",
        payload: price
    }
}

export function sortRating(rating) {
    return {
        type: "SORT_RATING",
        payload: rating
    }
}

export function deleteProduct(id) {
    return async function (dispatch) {
        let deleted = await axios.delete("http://localhost:3001/products/" + id)
    }
}

export function addToCart(id) {
    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/products/" + id)
            return dispatch({
                type: "ADD_TO_CART",
                payload: json.data
            })
        }
        catch(e) {
            console.log(e)
        }
    }
}




