import {
    All_CUISINES_REQUEST,
    All_CUISINES_SUCCESS,
    All_CUISINES_FAIL,
    DELETE_CUISINES_REQUEST,
    DELETE_CUISINES_SUCCESS,
    DELETE_CUISINES_FAIL,
    DELETE_CUISINES_RESET,
    NEW_CUISINES_REQUEST,
    NEW_CUISINES_SUCCESS,
    NEW_CUISINES_FAIL,
    NEW_CUISINES_RESET,
    CLEAR_ERRORS
} from '../constants/cuisinesConstants.js';

export const cuisinesReducer = (state = { cuisines: []}, action) => {
   switch (action.type) {
        case All_CUISINES_REQUEST:
            return {
                loading: true,
                cuisines: [],
        };
        case All_CUISINES_SUCCESS:
            return {
                loading: false,
                cuisines: action.payload,
        };
        case All_CUISINES_FAIL:
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

export const deletecuisinesReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_CUISINES_REQUEST:
        return {
          ...state,
          loading: true,
          isDeleted:false
        };
      case DELETE_CUISINES_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
      case DELETE_CUISINES_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_CUISINES_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };

  export const newCuisinesReducer = (state = { cuisines: {} }, action) => {
    switch (action.type) {
        case NEW_CUISINES_REQUEST:
            return {
                ...state,
                loading: true,
                success:false
            };
            case NEW_CUISINES_SUCCESS:
                return {
                  loading: false,
                  success: action.payload
                };
              case NEW_CUISINES_FAIL:
                return {
                  ...state,
                  loading: false,
                  error: action.payload,
                };
              case NEW_CUISINES_RESET:
                return {
                  ...state,
                  success: false,
                };
              case CLEAR_ERRORS:
                return {
                  ...state,
                  error: null,
                };
              default:
                return state;
    }
};