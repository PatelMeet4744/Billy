import {
    All_QUESTION_REQUEST,
    All_QUESTION_SUCCESS,
    All_QUESTION_FAIL,
    NEW_QUESTION_REQUEST,
    NEW_QUESTION_SUCCESS,
    NEW_QUESTION_FAIL,
    NEW_QUESTION_RESET,
    UPDATE_QUESTION_REQUEST,
    UPDATE_QUESTION_SUCCESS,
    UPDATE_QUESTION_FAIL,
    UPDATE_QUESTION_RESET,
    SINGLE_QUESTION_REQUEST,
    SINGLE_QUESTION_SUCCESS,
    SINGLE_QUESTION_FAIL,
    CLEAR_ERRORS
} from '../constants/questionConstants.js';
import axios from 'axios';
import { DELETE_DELIVERYBOY_FAIL, DELETE_DELIVERYBOY_REQUEST, DELETE_DELIVERYBOY_SUCCESS } from '../constants/deliveryBoyConstants.js';

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

// Create Question
export const createQuestion = (questionData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_QUESTION_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
    axios.defaults.headers.common["Authorization"] = token;
    const { data } = await axios.post('http://localhost:4000/api/question', questionData, config);
    // alert(JSON.stringify(data.message))
    if(data.message === "Success")
    {
      dispatch({
        type: NEW_QUESTION_SUCCESS,
        payload: true,
      });
    }
    else{
      dispatch({
        type: NEW_QUESTION_FAIL,
        payload: "Someting Went Wrong",
      });
    }
    
  } catch (error) {
    dispatch({
      type: NEW_QUESTION_RESET,
      payload: error.response.data.message,
    });
  }
};

// Delete Question
export const deletequestion = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_DELIVERYBOY_REQUEST });
  
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.delete(`http://localhost:4000/api/question/${id}`, '', config);
      if(data.message === "Success")
      {
        dispatch({
          type: DELETE_DELIVERYBOY_SUCCESS,
          payload: true,
        });
      }
      
    } catch (error) {
      dispatch({
        type: DELETE_DELIVERYBOY_FAIL,
        payload: error.response.data.message,
      });
    }
};

// Update Question
export const updatequestion = (id, questionData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_QUESTION_REQUEST });

    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    };

    const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
    axios.defaults.headers.common["Authorization"] = token;
    const {data} = await axios.put(`http://localhost:4000/api/question/${id}`, questionData, config);

    if(data.message === "Success")
    {
      dispatch({
        type: UPDATE_QUESTION_SUCCESS,
        payload: true,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_QUESTION_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Single Question
export const getsinglequestion = (id) => async (dispatch) => {
  try {
      dispatch({ type: SINGLE_QUESTION_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.get(`http://localhost:4000/api/question/${id}`, '', config);
      
    if(data.message === "Success")
    {
      dispatch({
        type: SINGLE_QUESTION_SUCCESS,
        payload: data.data,
      });
    }
  } catch (error) {
      dispatch({ type: All_QUESTION_FAIL, payload: error.response.data.message})
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};