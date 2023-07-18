import {
    All_ITEM_REQUEST,
    All_ITEM_SUCCESS,
    All_ITEM_FAIL,
    SINGLE_ITEM_REQUEST,
    SINGLE_ITEM_FAIL,
    SINGLE_ITEM_SUCCESS,
    CLEAR_ERRORS
} from '../constants/ItemCostants.js';
import axios from 'axios';

//Retrive Referral Amount
export const getItems = () => async (dispatch) => {
    try {
      dispatch({ type: All_ITEM_REQUEST })

      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.get('http://localhost:4000/api/item?page=1&pageSize=10', '', '');

      dispatch({ type: All_ITEM_SUCCESS, payload: data.data })
  
    } catch (error) {
      dispatch({ type: All_ITEM_FAIL, payload: error.response.data.message })
    }
};

//Retrive Referral Amount
export const getSingleItems = (id) => async (dispatch) => {
    try {
      dispatch({ type: SINGLE_ITEM_REQUEST })

      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.get(`http://localhost:4000/api/item/${id}`, '', '');

      dispatch({ type: SINGLE_ITEM_SUCCESS, payload: data.data })
  
    } catch (error) {
      dispatch({ type: SINGLE_ITEM_FAIL, payload: error.response.data.message })
    }
};

