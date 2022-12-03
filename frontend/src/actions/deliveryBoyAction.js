import {
    All_DELIVERYBOY_REQUEST,
    All_DELIVERYBOY_SUCCESS,
    All_DELIVERYBOY_FAIL,
    CLEAR_ERRORS
} from "../constants/deliveryBoyConstants.js"
import axios from "axios"

export const getdeliveryboy = () => async (dispatch) => {
    try {
        dispatch({type: All_DELIVERYBOY_REQUEST})
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get('http://localhost:4000/api/deliveryBoy?page=1&pageSize=10', '', '');
        
        dispatch({type: All_DELIVERYBOY_SUCCESS, payload: data.data})

    } catch (error) {
        dispatch({ type: All_DELIVERYBOY_FAIL, payload: error.response.data.message})
    }
}

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };