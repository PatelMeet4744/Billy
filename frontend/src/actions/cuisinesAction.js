import {
    All_CUISINES_REQUEST,
    All_CUISINES_SUCCESS,
    All_CUISINES_FAIL,
    DELETE_CUISINES_REQUEST,
    DELETE_CUISINES_SUCCESS,
    DELETE_CUISINES_FAIL,
    DELETE_CUISINES_RESET,
    CLEAR_ERRORS
} from '../constants/cuisinesConstants.js';
import axios from 'axios';

export const getcuisines = () => async (dispatch) => {
    try{
        dispatch({ type: All_CUISINES_REQUEST });

        const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
        axios.defaults.headers.common["Authorization"] = token;
        const { data } = await axios.get('http://localhost:4000/api/cuisines', '', '');
        dispatch( { type: All_CUISINES_SUCCESS, payload: data.data})

    }catch (error){
        dispatch({ type: All_CUISINES_FAIL, payload: error.response.data.message})
    }
};

// Delete Product
export const deletecuisines = (id,cuisinesData) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_CUISINES_REQUEST });
      
      const menuItem=[
        {
            path:"/admin/dashboard",
            name:"Dashboard",
            icon:<i className="mdi mdi-view-quilt menu-icon" />
        }
      ]
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.put(`http://localhost:4000/api/cuisines/${id}`, cuisinesData, config);
    
      if(data.message === "Success")
      {
        dispatch({
          type: DELETE_CUISINES_SUCCESS,
          payload: true,
        });
      }
      
    } catch (error) {
      dispatch({
        type: DELETE_CUISINES_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};