import {
    All_CUSTOMER_REQUEST,
    All_CUSTOMER_SUCCESS,
    All_CUSTOMER_FAIL,
    CLEAR_ERRORS
} from '../constants/customerConstants.js';

export const customerReducer = (state = { customer: [] }, action) => {
    switch (action.type) {
        case All_CUSTOMER_REQUEST:
            return {
                loading: true,
                customer: [],
        };
        case All_CUSTOMER_SUCCESS:
            return {
                loading: false,
                customer: action.payload,
        };
        case All_CUSTOMER_FAIL:
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