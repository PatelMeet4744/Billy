import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,   
    CLEAR_ERRORS
} from '../constants/restaurantConstants'
import axios from "axios"


export const restaurantlogin = (ownerEmailID, ownerPassword) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post('http://localhost:4000/api/restaurant/login', {ownerEmailID,ownerPassword}, config);

        // alert(JSON.stringify(data))
        
        if(data.data.message === "Invalid Email ID")
        {
            dispatch({ type: LOGIN_FAIL, payload: "Invalid Email Id"})
        }else{
          if(data.data.message === "The status is deactive"){
            dispatch({ type: LOGIN_FAIL, payload: "Your Account is Deactive"})
          }else{
            if(data.data.message === "Invalid Password"){
              dispatch({ type: LOGIN_FAIL, payload: "Invalid Password"})
          }
          else{
              sessionStorage.setItem("restaurant", JSON.stringify(data.data.restaurant));
              sessionStorage.setItem("x-auth-token", data.data.token);
              dispatch({ type: LOGIN_SUCCESS, payload: data.data})
          }
          }
        }

        
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message})
    }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};