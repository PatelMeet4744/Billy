import {
    All_DELIVERYBOY_REQUEST,
    All_DELIVERYBOY_SUCCESS,
    All_DELIVERYBOY_FAIL,
    NEW_DELIVERYBOY_REQUEST,
    NEW_DELIVERYBOY_SUCCESS,
    NEW_DELIVERYBOY_RESET,
    NEW_DELIVERYBOY_FAIL,
    UPDATE_DELIVERYBOY_REQUEST,
    UPDATE_DELIVERYBOY_SUCCESS,
    UPDATE_DELIVERYBOY_FAIL,
    UPDATE_DELIVERYBOY_RESET,
    DELETE_DELIVERYBOY_REQUEST,
    DELETE_DELIVERYBOY_SUCCESS,
    DELETE_DELIVERYBOY_FAIL,
    DELETE_DELIVERYBOY_RESET,
    SINGLE_DELIVERYBOY_REQUEST,
    SINGLE_DELIVERYBOY_SUCCESS,
    SINGLE_DELIVERYBOY_FAIL,
    CLEAR_ERRORS
} from '../constants/deliveryBoyConstants.js';

export const deliveryboyReducer = (state = { deliveryboy: [] }, action) => {
    switch (action.type) {
        case All_DELIVERYBOY_REQUEST:
            return {
                loading: true,
                deliveryboy: [],
            };
        case All_DELIVERYBOY_SUCCESS:
            return {
                loading: false,
                deliveryboy: action.payload,
            };
        case All_DELIVERYBOY_FAIL:
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

export const newDeliveryBoyReducer = (state = { deliveryboy: {} }, action) => {
    switch (action.type) {
        case NEW_DELIVERYBOY_REQUEST:
            return {
                ...state,
                loading: true,
                success:false
            };
            case NEW_DELIVERYBOY_SUCCESS:
                return {
                  loading: false,
                  success: action.payload
                };
              case NEW_DELIVERYBOY_FAIL:
                return {
                  ...state,
                  loading: false,
                  error: action.payload,
                };
              case NEW_DELIVERYBOY_RESET:
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

export const deleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DELIVERYBOY_REQUEST:
    case UPDATE_DELIVERYBOY_REQUEST:
      return {
        ...state,
        loading: true
      };
    case DELETE_DELIVERYBOY_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_DELIVERYBOY_SUCCESS:
      return {
         ...state,
         loading: false,
         isUpdated: action.payload,
      };
    case DELETE_DELIVERYBOY_FAIL:
    case UPDATE_DELIVERYBOY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_DELIVERYBOY_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_DELIVERYBOY_RESET:
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

export const singledeliveryboyReducer = (state = { singledeliveryboy: [] }, action) => {
  switch (action.type) {
      case SINGLE_DELIVERYBOY_REQUEST:
          return {
              loading: true,
              singledeliveryboy: [],
          };
      case SINGLE_DELIVERYBOY_SUCCESS:
          return {
              loading: false,
              singledeliveryboy: action.payload,
          };
      case SINGLE_DELIVERYBOY_FAIL:
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
}