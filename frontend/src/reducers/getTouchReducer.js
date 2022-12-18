import {
   All_GETTOUCH_REQUEST,
   All_GETTOUCH_SUCCESS,
   All_GETTOUCH_FAIL,
   CLEAR_ERRORS
} from '../constants/getTouchConstants.js';

export const getTouchReducer = (state = { gettouch: [] }, action) => {
    switch (action.type) {
        case All_GETTOUCH_REQUEST:
            return {
                loading: true,
                gettouch: [],
        };
        case All_GETTOUCH_SUCCESS:
            return {
                loading: false,
                gettouch: action.payload,
        };
        case All_GETTOUCH_FAIL:
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