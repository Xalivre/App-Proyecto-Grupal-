const initialState = {
    products: [],
    details: [],
    users: []
}

const GET_PRODUCTS = "GET_PRODUCTS";
const GET_DETAILS =  "GET_DETAILS";

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
    }
}

export default rootReducer;