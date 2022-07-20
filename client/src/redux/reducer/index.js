const initialState = {
  allProducts: [],
  products: [],
  details: [],
  users: [],
  cart: [],
  carousel: [],
  mostViewed: [],
  recentlyAdded: [],
};

const GET_PRODUCTS = "GET_PRODUCTS";
const GET_DETAILS = "GET_DETAILS";
const SORT_PRICE = "SORT_PRICE";
const SORT_RATING = "SORT_RATING";
const FILTER_CATEGORY = "FILTER_CATEGORY";
const ADD_TO_CART = "ADD_TO_CART";
const CAROUSEL = "CAROUSEL";
const MOST_VIEWED = "MOST_VIEWED";
const RECENTLY_ADDED = "RECENTLY_ADDED";
const SEARCH_BAR = "SEARCH_BAR";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
      };

    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    case SORT_PRICE:
      const sortPrices =
        action.payload === "Ascending"
          ? state.products.sort((a, b) => a.price - b.price)
          : action.payload === "Descending"
          ? state.products.sort((a, b) => b.price - a.price)
          : state.products;
      return {
        ...state,
        products: sortPrices,
      };

    case SORT_RATING:
      const sortRating =
        action.payload === "Ascending"
          ? state.products.sort((a, b) => a.rating - b.rating)
          : action.payload === "Descending"
          ? state.products.sort((a, b) => b.price - a.price)
          : state.products;
      return {
        ...state,
        products: sortRating,
      };

    case FILTER_CATEGORY:
      const allProducts = state.allProducts;
      const filteredProducts =
        action.payload === "All"
          ? allProducts
          : allProducts.filter(
              (product) => product.category === action.payload
            );
      return {
        ...state,
        products: filteredProducts,
      };

    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case CAROUSEL:
      return {
        ...state,
        carousel: action.payload,
      };

    case MOST_VIEWED:
      return {
        ...state,
        mostViewed: action.payload,
      };

    case RECENTLY_ADDED:
      return {
        ...state,
        recentlyAdded: action.payload,
      };
    case SEARCH_BAR:
      return {
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
