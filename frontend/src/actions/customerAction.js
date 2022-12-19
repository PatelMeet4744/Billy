import {
    All_CUSTOMER_REQUEST,
    All_CUSTOMER_SUCCESS,
    All_CUSTOMER_FAIL,
    CLEAR_ERRORS
} from '../constants/customerConstants.js';
import axios from "axios";

export const getcustomer = () => async (dispatch) => {
    try {
        dispatch({ type: All_CUSTOMER_REQUEST });
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get('http://localhost:4000/api/customer', '', '');

        dispatch( { type: All_CUSTOMER_SUCCESS, payload: data.data})

    } catch (error) {
        dispatch({ type: All_CUSTOMER_FAIL, payload: error.response.data.message})
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};