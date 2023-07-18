import { combineReducers, applyMiddleware, legacy_createStore } from "redux";
// import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { legacy_createStore as createStore } from 'redux';

import { adminReducer } from "./reducers/adminReducer";
import { customerReducer } from "./reducers/customerReducer";
import { complainReducer } from "./reducers/complainReducer";
import { OrderReducer } from "./reducers/OrderReducer";
import { ItemReducer,SingleItemReducer } from "./reducers/ItemReducer";
import { deliveryboyReducer,newDeliveryBoyReducer,deleteReducer, singledeliveryboyReducer,u } from "./reducers/deliveryBoyReducer";
import { cuisinesReducer,deletecuisinesReducer,newCuisinesReducer } from "./reducers/cuisinesReducer";
import { getTouchReducer } from "./reducers/getTouchReducer";
import { questionReducer,newQuestionReducer, singlequestionReducer ,deleteQuesReducer, updatequestionReducer } from "./reducers/questionReducer";
import { restaurantReducer,restaurantLoginReducer, ProfileReducer, forgotPasswordReducer } from "./reducers/restaurantReducer"
import { referralAmountReducer, updateReferralAmount } from "./reducers/referralAmountReducer";

const reducer = combineReducers({
    //Admin
    admin:adminReducer,
    
    //Customer
    customer:customerReducer,
    
    //Cuisines
    cuisines:cuisinesReducer,
    deleteCuisines:deletecuisinesReducer,
    newCuisines:newCuisinesReducer,

    //GetTouch
    gettouch:getTouchReducer,

    //Delivery Boy
    deliveryboy:deliveryboyReducer,
    newDeliveryBoy:newDeliveryBoyReducer,
    deleteDeliveryBoy:deleteReducer,
    singleDeliveryBoy:singledeliveryboyReducer,
    
    //Question
    question:questionReducer,
    newquestion:newQuestionReducer,
    deletequestion:deleteQuesReducer,
    updatequestion:updatequestionReducer,
    singlequestion:singlequestionReducer,

    //restaurant
    restaurant:restaurantReducer,
    restaurantDetail:restaurantLoginReducer,
    restaurantProfile:ProfileReducer,
    forgotPassword:forgotPasswordReducer,

    //referralAmount
    referralAmount:referralAmountReducer,
    updatereferralamount:updateReferralAmount,

    //Complain
    complain:complainReducer,

    //Orders
    Orders:OrderReducer,

    //Item
    Item:ItemReducer,
    singleItem:SingleItemReducer
});

let initialState = {

};

const middleware = [thunk];
const store = legacy_createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;