import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS
} from '../constants/restaurantConstants.js';

export const restaurantLoginReducer = (state = { restaurantDetail: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                restaurantloading: true,
                isAuthenticated: false,
        };
        case LOGIN_SUCCESS:
            return {
                ...state,
                restaurantloading: false,
                isAuthenticated: true,
                restaurantDetail: action.payload,
        };
        case LOGIN_FAIL:
            return {
                ...state,
                restaurantloading: false,
                isAuthenticated: false,
                restaurantDetail: null,
                restaurnaterror: action.payload,
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
