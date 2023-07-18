import {
    All_COMPLAIN_REQUEST,
    All_COMPLAIN_SUCCESS,
    All_COMPLAIN_FAIL,
    CLEAR_ERRORS
} from '../constants/complainConstants.js';

export const complainReducer = (state = { complain: []}, action) => {
    switch (action.type) {
         case All_COMPLAIN_REQUEST:
             return {
                 loading: true,
                 complain: [],
         };
         case All_COMPLAIN_SUCCESS:
             return {
                 loading: false,
                 complain: action.payload,
         };
         case All_COMPLAIN_FAIL:
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