import { combineReducers, applyMiddleware, legacy_createStore } from "redux";
// import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { legacy_createStore as createStore } from 'redux';

import { adminReducer } from "./reducers/adminReducer";
import { deliveryboyReducer } from "./reducers/deliveryBoyReducer";
import { getTouchReducer } from "./reducers/getTouchReducer";
import { customerReducer } from "./reducers/customerReducer";
import { questionReducer } from "./reducers/questionReducer";
import { cuisinesReducer,deletecuisinesReducer } from "./reducers/cuisinesReducer";

const reducer = combineReducers({
    admin:adminReducer,
    deliveryboy:deliveryboyReducer,
    gettouch:getTouchReducer,
    customer:customerReducer,
    question:questionReducer,
    cuisines:cuisinesReducer,
    deleteCuisines:deletecuisinesReducer,
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