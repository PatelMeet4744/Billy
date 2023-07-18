import {
    All_COMPLAIN_REQUEST,
    All_COMPLAIN_SUCCESS,
    All_COMPLAIN_FAIL,
    CLEAR_ERRORS
} from '../constants/complainConstants.js';
import axios from 'axios';

export const getcomplain = () => async (dispatch) => {
    try{
        dispatch({ type: All_COMPLAIN_REQUEST });

        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get('http://localhost:4000/api/complain', '', '');
        dispatch( { type: All_COMPLAIN_SUCCESS, payload: data.data})

    }catch (error){
        dispatch({ type: All_COMPLAIN_FAIL, payload: error.response.data.message})
    }
};
