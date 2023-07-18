import {
    All_Orders_REQUEST,
    All_Orders_SUCCESS,
    All_Orders_FAIL,
    CLEAR_ERRORS
} from '../constants/OrderConstants.js';
import axios from 'axios';

//Retrive Referral Amount
export const getorders = () => async (dispatch) => {
    try {
      dispatch({ type: All_Orders_REQUEST })

      const token = ("bearer " + await sessionStorage.getItem("x-auth-token"));
      axios.defaults.headers.common["Authorization"] = token;
      const { data } = await axios.get('http://localhost:4000/api/orderdetail?page=1&pageSize=10', '', '');

      // return alert(JSON.stringify(data.data[0].item.itemName));
      // return alert(JSON.stringify(data.data[0].orderMaster.customer.customerName));

      dispatch({ type: All_Orders_SUCCESS, payload: data.data })
  
    } catch (error) {
      dispatch({ type: All_Orders_FAIL, payload: error.response.data.message })
    }
};