import { 
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS
} from "../constants/adminConstants";
import axios from "axios";
import swal from "sweetalert";

export const adminlogin = (adminEmailID, adminPassword) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const { data } = await axios.post('http://localhost:4000/api/admin/login', {adminEmailID,adminPassword}, config);

        if(data.data.message === "Invalid Email ID")
        {
            dispatch({ type: LOGIN_FAIL, payload: "Invalid Email Id"})
        }else{
            if(data.data.message === "Invalid Password"){
                dispatch({ type: LOGIN_FAIL, payload: "Invalid Password"})
            }
            else{
                sessionStorage.setItem("admin", JSON.stringify(data.data.admin));
                sessionStorage.setItem("x-auth-token", data.data.token);
                dispatch({ type: LOGIN_SUCCESS, payload: data.data})
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