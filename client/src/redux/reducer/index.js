const initialState = {
    allProducts:[],
    products: [],
    details: [],
    users: [],
    cart: [],
}

const GET_PRODUCTS = "GET_PRODUCTS";
const GET_DETAILS =  "GET_DETAILS";
const SORT_PRICE  =  "SORT_PRICE";
const SORT_RATING = "SORT_RATING";
const FILTER_CATEGORY = "FILTER_CATEGORY";
const ADD_TO_CART = "ADD_TO_CART"; 

const rootReducer = (state = initialState, action) =>{
    switch(action.type){


        case GET_PRODUCTS:
            return{
                ...state,
                products:action.payload,
            }

        case GET_DETAILS:
            return{
                ...state,
                details:action.payload,
            }

        case SORT_PRICE:
            const sortPrices=
                action.payload === "Ascending"
                    ? state.products.sort((a,b)=> a.price - b.price)
                    : action.payload === "Descending"
                    ? state.products.sort((a,b)=> b.price - a.price)
                    : state.products
            return{
                ...state,
                products:sortPrices,
            }

        case SORT_RATING:
            const sortRating=
                action.payload === "Ascending"
                    ? state.products.sort((a,b)=> a.rating - b.rating)
                    : action.payload === "Descending"
                    ? state.products.sort((a,b)=> b.price - a.price)
                    : state.products
            return{
                ...state,
                products:sortRating,
            }

        case FILTER_CATEGORY:
            const allProducts = state.allProducts;
            const filteredProducts = 
                action.payload === "All"
                ? allProducts
                : allProducts.filter(product =>
                    product.category === action.payload);
            return{
                ...state,
                products:filteredProducts
            }
        
        case ADD_TO_CART:
            return{
                ...state,
                cart:action.payload,
            }

        default:
            return state;
    }
}

export default rootReducer;