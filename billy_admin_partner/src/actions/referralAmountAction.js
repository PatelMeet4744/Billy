import {
    All_REFERRALAMOUNT_REQUEST,
    All_REFERRALAMOUNT_SUCCESS,
    All_REFERRALAMOUNT_FAIL,
    UPDATE_REFERRALAMOUNT_REQUEST,
    UPDATE_REFERRALAMOUNT_SUCCESS,
    UPDATE_REFERRALAMOUNT_FAIL,
    UPDATE_REFERRALAMOUNT_RESET,
    CLEAR_ERRORS
} from '../constants/referralAmountConstants.js';
import axios from "axios";

//Retrive Referral Amount
export const getreferralAmount = () => async (dispatch) => {
    try {
      dispatch({ type: All_REFERRALAMOUNT_REQUEST })
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.get('http://localhost:4000/api/referralAmount?page=1&pageSize=10', '', '');

      dispatch({ type: All_REFERRALAMOUNT_SUCCESS, payload: data.data[0] })
  
    } catch (error) {
      dispatch({ type: All_REFERRALAMOUNT_FAIL, payload: error.response.data.message })
    }
};

// Update ReferralAmount
export const updateReferralAmount = (referralAmountId, referralAmount) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_REFERRALAMOUNT_REQUEST });
  
      const config = {
        headers: {
            'Content-Type': 'application/json'
        }
      };
  
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const {data} = await axios.put(`http://localhost:4000/api/referralAmount/${referralAmountId}`, referralAmount, config);

      if(data.message === "Success")
      {
        dispatch({
          type: UPDATE_REFERRALAMOUNT_SUCCESS,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_REFERRALAMOUNT_FAIL,
        payload: error.response.data.message,
      });
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};