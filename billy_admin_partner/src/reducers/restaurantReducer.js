import {
    All_RESTAURANT_REQUEST,
    All_RESTAURANT_SUCCESS,
    All_RESTAURANT_FAIL,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    CLEAR_ERRORS
} from '../constants/restaurantConstants.js';

export const restaurantReducer = (state = { restaurant: [] }, action) => {
    switch (action.type) {
        case All_RESTAURANT_REQUEST:
            return {
                loading: true,
                restaurant: [],
            };
        case All_RESTAURANT_SUCCESS:
            return {
                loading: false,
                restaurant: action.payload,
            };
        case All_RESTAURANT_FAIL:
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

export const restaurantLoginReducer = (state = { restaurantDetail: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loading: true,
                isAuthenticated: false,
        };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                restaurantDetail: action.payload,
        };
        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                restaurantDetail: null,
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

export const ProfileReducer = (state = { }, action) => {
    switch (action.type) {
        case UPDATE_PASSWORD_REQUEST:
            return {
                loading: true
        };
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
        };
        case UPDATE_PASSWORD_FAIL:
            return {
                ...state,
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

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
      case FORGOT_PASSWORD_REQUEST:
      case RESET_PASSWORD_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FORGOT_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          message: action.payload,
        };
  
      case RESET_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          success: action.payload,
        };
  
      case FORGOT_PASSWORD_FAIL:
      case RESET_PASSWORD_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
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