import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS
} from "../constants/adminConstants";

export const adminReducer = (state = { admin: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
        };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                admin: action.payload,
        };
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                admin: null,
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