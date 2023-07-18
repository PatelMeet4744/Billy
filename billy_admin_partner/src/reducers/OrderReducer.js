import { 
    All_Orders_REQUEST,
    All_Orders_SUCCESS,
    All_Orders_FAIL,
    CLEAR_ERRORS
} from "../constants/OrderConstants.js";

export const OrderReducer = (state = { Orders: [] }, action) => {
    switch (action.type) {
        case All_Orders_REQUEST:
            return {
                loading: true,
                Orders: [],
            };
        case All_Orders_SUCCESS:
            return {
                loading: false,
                Orders: action.payload,
            };
        case All_Orders_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state
    }
};