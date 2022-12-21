import {
    All_QUESTION_REQUEST,
    All_QUESTION_SUCCESS,
    All_QUESTION_FAIL,
    CLEAR_ERRORS
} from '../constants/questionConstants.js';

export const questionReducer = (state = { question: [] }, action) => {
    switch (action.type) {
        case All_QUESTION_REQUEST:
            return {
                loading: true,
                question: [],
        };
        case All_QUESTION_SUCCESS:
            return {
                loading: false,
                question: action.payload,
        };
        case All_QUESTION_FAIL:
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