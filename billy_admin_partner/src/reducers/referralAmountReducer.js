import {
    All_REFERRALAMOUNT_REQUEST,
    All_REFERRALAMOUNT_SUCCESS,
    All_REFERRALAMOUNT_FAIL,
    UPDATE_REFERRALAMOUNT_REQUEST,
    UPDATE_REFERRALAMOUNT_SUCCESS,
    UPDATE_REFERRALAMOUNT_FAIL,
    UPDATE_REFERRALAMOUNT_RESET,
    CLEAR_ERRORS
} from '../constants/referralAmountConstants.js';

export const referralAmountReducer = (state = { referralamount: [] }, action) => {
    switch (action.type) {
        case All_REFERRALAMOUNT_REQUEST:
            return {
                loading: true,
                referralamount: [],
            };
        case All_REFERRALAMOUNT_SUCCESS:
            return {
                loading: false,
                referralamount: action.payload,
            };
        case All_REFERRALAMOUNT_FAIL:
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

export const updateReferralAmount = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_REFERRALAMOUNT_REQUEST:
        return {
          ...state,
          loading: true,
          isUpdated: false,
        };
      case UPDATE_REFERRALAMOUNT_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case UPDATE_REFERRALAMOUNT_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_REFERRALAMOUNT_RESET:
        return {
          ...state,
          isUpdated: false,
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