import {
    All_DELIVERYBOY_REQUEST,
    All_DELIVERYBOY_SUCCESS,
    All_DELIVERYBOY_FAIL,
    CLEAR_ERRORS
} from '../constants/deliveryBoyConstants.js';

export const deliveryboyReducer = (state = { deliveryboy: [] }, action) => {
    switch (action.type) {
        case All_DELIVERYBOY_REQUEST:
            return {
                loading: true,
                deliveryboy: [],
        };
        case All_DELIVERYBOY_SUCCESS:
            return {
                loading: false,
                deliveryboy: action.payload,
        };
        case All_DELIVERYBOY_FAIL:
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
}