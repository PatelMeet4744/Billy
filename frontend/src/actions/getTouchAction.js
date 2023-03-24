import {
    All_GETTOUCH_REQUEST,
    All_GETTOUCH_SUCCESS,
    All_GETTOUCH_FAIL,
    CLEAR_ERRORS
} from '../constants/getTouchConstants.js';
import axios from 'axios';

export const getgetTouch = () => async (dispatch) => {
    try{
        dispatch({ type: All_GETTOUCH_REQUEST });
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get('http://localhost:4000/api/getTouch', '', '');

        dispatch( { type: All_GETTOUCH_SUCCESS, payload: data.data})
    }catch (error)
    {
        dispatch({type: All_GETTOUCH_FAIL,payload: error.response.data.message})
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};