import {
    All_QUESTION_REQUEST,
    All_QUESTION_SUCCESS,
    All_QUESTION_FAIL,
    CLEAR_ERRORS
} from '../constants/questionConstants.js';
import axios from 'axios';

export const getquestion = () => async (dispatch) => {
    try {
        dispatch({ type: All_QUESTION_REQUEST });
        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get('http://localhost:4000/api/question', '', '');
        
        dispatch( { type: All_QUESTION_SUCCESS, payload: data.data})

    } catch (error) {
        dispatch({ type: All_QUESTION_FAIL, payload: error.response.data.message})
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};