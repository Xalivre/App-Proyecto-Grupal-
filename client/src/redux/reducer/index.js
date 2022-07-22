const initialState = {
  allProducts: [],
  products: [],
  details: [],
  users: [],
  cart: [],
  carousel: [],
  mostViewed: [],
  recentlyAdded: [],
  filteredProducts: [],
  operation: "",
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
const POST_PRODUCT = "POST_PRODUCT"

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
        filteredProducts: action.payload,
        operation: "Default"
      };

    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
        operation: "Details",
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
        operation: "DefaultRating",
      };

    case FILTER_CATEGORY:
      const categoryFilter = state.allProducts.filter((e) => e.category === action.payload)
      console.log(categoryFilter)
      return {
        ...state,
        filteredProducts: categoryFilter,
        operation: "Default",
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
        operation: "Default",
      };

    case POST_PRODUCT:
      return {
        ...state,
      }

    case SORT_PRICE:
      const sortedArray = action.payload === "Ascending" ? [...state.products].sort(function (a, b) {
        if (a.price > b.price) {
          return 1
        }
        if (b.price > a.price) {
          return -1
        }
        return 0
      })
        :
        [...state.products].sort(function (a, b) {
          if (a.price > b.price) {
            return -1
          }
          if (b.price > a.price) {
            return 1
          }
        })
      return {
        ...state,
        products: action.payload === "Default" ? [...state.products] : sortedArray,
        filteredProducts: action.payload === "Default" ? [...state.allProducts] : sortedArray,
        operation: "",
      }


    default:
      return state;
  }
};

export default rootReducer;
