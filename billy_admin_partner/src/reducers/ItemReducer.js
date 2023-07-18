import {
    All_ITEM_REQUEST,
    All_ITEM_SUCCESS,
    All_ITEM_FAIL,
    SINGLE_ITEM_REQUEST,
    SINGLE_ITEM_FAIL,
    SINGLE_ITEM_SUCCESS,
    CLEAR_ERRORS
} from '../constants/ItemCostants.js';


export const ItemReducer = (state = { Items: [] }, action) => {
    switch (action.type) {
        case All_ITEM_REQUEST:
            return {
                loading: true,
                Items: [],
            };
        case All_ITEM_SUCCESS:
            return {
                loading: false,
                Items: action.payload,
            };
        case All_ITEM_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state
    }
};

export const SingleItemReducer = (state = { SingleItems: [] }, action) => {
    switch (action.type) {
        case SINGLE_ITEM_REQUEST:
            return {
                loading: true,
                SingleItems: [],
            };
        case SINGLE_ITEM_SUCCESS:
            return {
                loading: false,
                SingleItems: action.payload,
            };
        case SINGLE_ITEM_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };

        default:
            return state
    }
};