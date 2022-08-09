/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
const initialState = {
  allProducts: [],
  products: [],
  details: [],
  paymentHistory: [],
  users: [],
  cart: localStorage.getItem('Carrito')
    ? JSON.parse(localStorage.getItem('Carrito'))
    : [],
  carousel: [],
  mostViewed: [],
  recentlyAdded: [],
  filteredProducts: [],
  wishList: [],
  operation: '',
  categories: [],
  brands: [],
  nameSearched: '',
  userPayments: [],
  finishOrder: {},
  loginRefresher: false,
  totalPayments: [],
  userDetails: {},
  userSearchedFor: [],
  userPaymentId: {},
  builder: []
};

const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_DETAILS = 'GET_DETAILS';
const SORT_PRICE = 'SORT_PRICE';
/* const SORT_RATING = "SORT_RATING"; */
const ADD_TO_CART = 'ADD_TO_CART';
const CAROUSEL = 'CAROUSEL';
const MOST_VIEWED = 'MOST_VIEWED';
const RECENTLY_ADDED = 'RECENTLY_ADDED';
const SEARCH_BAR = 'SEARCH_BAR';
const REMOVE_CART = 'REMOVE_CART';
const ADD_TO_WISHLIST = 'ADD_TO_WISHLIST';
const REMOVE_FROM_WISHLIST = 'REMOVE_FROM_WISHLIST';
const POST_PRODUCT = 'POST_PRODUCT';
const GET_CATEGORIES = 'GET_CATEGORIES';
const GET_BRANDS = 'GET_BRANDS';
const CLEAR_PAGE = 'CLEAR_PAGE';
const POST_USER = 'POST_USER';
const POST_USER_GOOGLE = 'POST_USER_GOOGLE';
const LOGIN = 'LOGIN';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const GET_USER_PAYMENTS = 'GET_USER_PAYMENTS';
const FINISH_ORDER = 'FINISH_ORDER';
const MODIFY_CART = 'MODIFY_CART';
const LOGIN_REFRESHER = 'LOGIN_REFRESHER';
const GET_USERS = 'GET_USERS';
const BAN_USER = 'BAN_USER';
const UNBAN_USER = 'UNBAN_USER';
const MODIFY_QUANTITY_UP = 'MODIFY_QUANTITY_UP';
const MODIFY_QUANTITY_DOWN = 'MODIFY_QUANTITY_DOWN';
const UPDATE_USER_STATE = 'UPDATE_USER_STATE';
const ADMIN_USER = 'ADMIN_USER';
const GET_PAYMENT_HISTORY = 'GET_PAYMENT_HISTORY';
const TOTAL_PAYMENTS = 'TOTAL_PAYMENTS';
const GET_USER_DETAILS = 'GET_USER_DETAILS';
const FIND_USER = 'FIND_USER';
const SORT_DATE = 'SORT_DATE';
const GET_PAYMENT_BY_ID = 'GET_PAYMENT_BY_ID';
const CLEAR_HISTORY_PAGE = 'CLEAR_HISTORY_PAGE';
const EDIT_USER = 'EDIT_USER'
const ADD_TO_BUILDER = "ADD_TO_BUILDER"

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        allProducts: action.payload,
        filteredProducts: action.payload.filter((e) =>
          state.nameSearched && state.nameSearched !== 'aklsjdhlaksjdaskldazzzz'
            ? e.name.toLowerCase().includes(state.nameSearched.toLowerCase())
            : e.name !== 'uzk'
        ),
        operation: 'Default',
      };

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ADD_TO_WISHLIST:
      state.userDetails.wishList.push(action.payload);
      return {
        ...state,
      };

    case REMOVE_FROM_WISHLIST:
      state.userDetails.wishList.filter((e) => e._id !== action.payload);
      return {
        ...state,
      };
    case GET_USER_PAYMENTS:
      return {
        ...state,
        userPayments: action.payload,
      };

    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
        operation: 'Details',
      };

    case GET_PAYMENT_HISTORY:
      return {
        ...state,
        paymentHistory: action.payload,
      };

    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    case ADD_TO_BUILDER:
      return {
        ...state,
        builder: [...state.builder, action.payload]
      }

    case REMOVE_CART:
      localStorage.setItem(
        'Carrito',
        JSON.stringify(state.cart.filter((e) => e._id !== action.payload))
      );
      return {
        ...state,
        cart: state.cart.filter((e) => e._id !== action.payload),
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
    case SEARCH_BAR: {
      let a =
        action.payload === 'aklsjdhlaksjdaskldazzzz'
          ? state.allProducts
          : [...state.allProducts].filter((x) =>
            x.name.toLowerCase().includes(action.payload.toLowerCase())
          );
      return {
        ...state,
        filteredProducts: a.length > 0 ? a : state.allProducts,
        nameSearched: action.payload,
        operation:
          a.length < 1
            ? 'Error SearchBar'
            : action.payload === 'aklsjdhlaksjdaskldazzzz'
              ? 'No hacer nada'
              : 'SearchBar',
      };
    }

    case POST_PRODUCT:
      return {
        ...state,
      };

    case POST_USER:
      return {
        ...state,
      };

    case POST_USER_GOOGLE:
      return {
        ...state,
      };

    case LOGIN:
      return {
        ...state,
      };

    case SORT_PRICE: {
      const sortedArray =
        action.payload === 'Ascending'
          ? [...state.filteredProducts].sort(function (a, b) {
            if (a.price > b.price) {
              return 1;
            }
            if (b.price > a.price) {
              return -1;
            }
            return 0;
          })
          : [...state.filteredProducts].sort(function (a, b) {
            if (a.price > b.price) {
              return -1;
            }
            if (b.price > a.price) {
              return 1;
            }
            return 0;
          });
      return {
        ...state,
        products:
          action.payload === 'Default' ? [...state.products] : sortedArray,
        filteredProducts:
          action.payload === 'Default'
            ? [...state.filteredProducts]
            : sortedArray,
        operation: 'No hacer nada',
      };
    }

    case SORT_DATE:
      const sortedByDate =
        action.payload === 'Most Recent'
          ? {
            despachado: [state.totalPayments.despachado][0].sort((a, b) => {
              if (a.date === b.date) {
                return 0;
              }
              if (a.date > b.date) {
                return -1;
              }
              return 1;
            }),
            pendiente: [state.totalPayments.pendiente][0].sort((a, b) => {
              if (a.date === b.date) {
                return 0;
              }
              if (a.date > b.date) {
                return -1;
              }
              return 1;
            }),
            finalizado: [state.totalPayments.finalizado][0].sort((a, b) => {
              if (a.date === b.date) {
                return 0;
              }
              if (a.date > b.date) {
                return -1;
              }
              return 1;
            }),
            cancelado: [state.totalPayments.cancelado][0].sort((a, b) => {
              if (a.date === b.date) {
                return 0;
              }
              if (a.date > b.date) {
                return -1;
              }
              return 1;
            }),
          }
          : action.payload === 'Oldest'
            ? {
              despachado: [state.totalPayments.despachado][0].sort((a, b) => {
                if (a.date === b.date) {
                  return 0;
                }
                if (a.date < b.date) {
                  return -1;
                }
                return 1;
              }),
              pendiente: [state.totalPayments.pendiente][0].sort((a, b) => {
                if (a.date === b.date) {
                  return 0;
                }
                if (a.date < b.date) {
                  return -1;
                }
                return 1;
              }),
              finalizado: [state.totalPayments.finalizado][0].sort((a, b) => {
                if (a.date === b.date) {
                  return 0;
                }
                if (a.date < b.date) {
                  return -1;
                }
                return 1;
              }),
              cancelado: [state.totalPayments.cancelado][0].sort((a, b) => {
                if (a.date === b.date) {
                  return 0;
                }
                if (a.date < b.date) {
                  return -1;
                }
                return 1;
              }),
            }
            : state.totalPayments;
      return {
        ...state,
        totalPayments: sortedByDate,
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };

    case GET_BRANDS:
      return {
        ...state,
        brands: action.payload,
      };

    case CLEAR_PAGE:
      return {
        ...state,
        details: [],
        userDetails: {},
      };

    case EDIT_PRODUCT:
      return {
        ...state,
      };

    case FINISH_ORDER:
      return {
        ...state,
        finishOrder: action.payload,
      };

    case UPDATE_USER_STATE:
      return {
        ...state,
      };

    case ADMIN_USER:
      return {
        ...state,
      };

    case MODIFY_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case LOGIN_REFRESHER:
      return {
        ...state,
        loginRefresher: !state.loginRefresher,
      };

    case MODIFY_QUANTITY_UP:
      let d = state.cart.findIndex((e) => e._id === action.payload);
      let f = {
        quantity: state.cart[d].quantity ? state.cart[d].quantity + 1 : 1,
      };
      let g = Object.assign({}, state.cart[d], f);
      return {
        ...state,
        cart: state.cart.map((e) => (e._id === action.payload ? g : e)),
      };

    case MODIFY_QUANTITY_DOWN:
      let a = state.cart.findIndex((e) => e._id === action.payload);
      let b = {
        quantity: state.cart[a].quantity ? state.cart[a].quantity - 1 : 1,
      };
      let c = Object.assign({}, state.cart[a], b);
      return {
        ...state,
        cart: state.cart.map((e) => (e._id === action.payload ? c : e)),
      };
    case TOTAL_PAYMENTS:
      return {
        ...state,
        totalPayments: action.payload,
      };
    case GET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload,
      };

    case FIND_USER:
      return {
        ...state,
        userSearchedFor: action.payload,
      };
    case GET_PAYMENT_BY_ID:
      return {
        ...state,
        userPaymentId: action.payload,
      };
    case CLEAR_HISTORY_PAGE:
      return {
        ...state,
        userPaymentId: {},
      };
    case EDIT_USER:
      return {
        ...state,
      }
    default:
      return state;
  }
};

export default rootReducer;
