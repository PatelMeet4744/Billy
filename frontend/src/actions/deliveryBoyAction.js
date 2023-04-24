import {
  All_DELIVERYBOY_REQUEST,
  All_DELIVERYBOY_SUCCESS,
  All_DELIVERYBOY_FAIL,
  NEW_DELIVERYBOY_REQUEST,
  NEW_DELIVERYBOY_SUCCESS,
  NEW_DELIVERYBOY_FAIL,
  NEW_DELIVERYBOY_RESET,
  UPDATE_DELIVERYBOY_REQUEST,
  UPDATE_DELIVERYBOY_SUCCESS,
  UPDATE_DELIVERYBOY_FAIL,
  UPDATE_DELIVERYBOY_RESET,
  DELETE_DELIVERYBOY_REQUEST,
  DELETE_DELIVERYBOY_SUCCESS,
  DELETE_DELIVERYBOY_FAIL,
  DELETE_DELIVERYBOY_RESET,
  SINGLE_DELIVERYBOY_REQUEST,
  SINGLE_DELIVERYBOY_SUCCESS,
  SINGLE_DELIVERYBOY_FAIL,
  CLEAR_ERRORS
} from "../constants/deliveryBoyConstants.js"
import axios from "axios"

export const getdeliveryboy = () => async (dispatch) => {
  try {
    dispatch({ type: All_DELIVERYBOY_REQUEST })
    const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
    axios.defaults.headers.common["Authorization"] = token;
    const { data } = await axios.get(`http://${process.env.REACT_APP_IP}/api/deliveryBoy?page=1&pageSize=10`, '', '');

    dispatch({ type: All_DELIVERYBOY_SUCCESS, payload: data.data })

  } catch (error) {
    dispatch({ type: All_DELIVERYBOY_FAIL, payload: error.response.data.message })
  }
};

// Create DeliveryBoy
export const createDeliveryBoy = (deliveryBoyData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_DELIVERYBOY_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
    axios.defaults.headers.common["Authorization"] = token;
    const { data } = await axios.post(`http://${process.env.REACT_APP_IP}/api/deliveryBoy`, deliveryBoyData, config);
    // alert(JSON.stringify(data.message))
    if(data.message === "Success")
    {
      dispatch({
        type: NEW_DELIVERYBOY_SUCCESS,
        payload: true,
      });
    }
    else{
      dispatch({
        type: NEW_DELIVERYBOY_FAIL,
        payload: "Someting Went Wrong",
      });
    }
    
  } catch (error) {
    dispatch({
      type: NEW_DELIVERYBOY_RESET,
      payload: error.response.data.message,
    });
  }
};

// Delete Product
export const deletedeliveryBoy = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DELIVERYBOY_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
    axios.defaults.headers.common["Authorization"] = token;
    const { data } = await axios.delete(`http://${process.env.REACT_APP_IP}/api/deliveryBoy/${id}`, '', config);

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

// Update DeliveryBoy
export const updateDeliveryBoy = (deliveryBoyId, deliveryBoyData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_DELIVERYBOY_REQUEST });

    const config = {
      headers: {
          'Content-Type': 'application/json'
      }
    };

    const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
    axios.defaults.headers.common["Authorization"] = token;
    const {data} = await axios.put(`http://${process.env.REACT_APP_IP}/api/deliveryBoy/${deliveryBoyId}`, deliveryBoyData, config);
    
    if(data.message === "Success")
    {
      dispatch({
        type: UPDATE_DELIVERYBOY_SUCCESS,
        payload: true,
      });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_DELIVERYBOY_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Single Question
export const getsingledeliveryboy = (id) => async (dispatch) => {
  try {
      dispatch({ type: SINGLE_DELIVERYBOY_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.get(`http://${process.env.REACT_APP_IP}/api/deliveryBoy/${id}`, '', config);
      
    if(data.message === "Success")
    {
      dispatch({
        type: SINGLE_DELIVERYBOY_SUCCESS,
        payload: data.data,
      });
    }
  } catch (error) {
      dispatch({ type: SINGLE_DELIVERYBOY_FAIL, payload: error.response.data.message})
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};