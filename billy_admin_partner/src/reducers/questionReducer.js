import {
    All_QUESTION_REQUEST,
    All_QUESTION_SUCCESS,
    All_QUESTION_FAIL,
    NEW_QUESTION_REQUEST,
    NEW_QUESTION_SUCCESS,
    NEW_QUESTION_FAIL,
    NEW_QUESTION_RESET,
    UPDATE_QUESTION_REQUEST,
    UPDATE_QUESTION_SUCCESS,
    UPDATE_QUESTION_FAIL,
    UPDATE_QUESTION_RESET,
    DELETE_QUESTION_REQUEST,
    DELETE_QUESTION_SUCCESS,
    DELETE_QUESTION_FAIL,
    DELETE_QUESTION_RESET,
    SINGLE_QUESTION_FAIL,
    SINGLE_QUESTION_SUCCESS,
    SINGLE_QUESTION_REQUEST,
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

export const newQuestionReducer = (state = { question: {} }, action) => {
  switch (action.type) {
      case NEW_QUESTION_REQUEST:
          return {
              ...state,
              loading: true,
              success:false
          };
          case NEW_QUESTION_SUCCESS:
              return {
                loading: false,
                success: action.payload
              };
            case NEW_QUESTION_FAIL:
              return {
                ...state,
                loading: false,
                error: action.payload,
              };
            case NEW_QUESTION_RESET:
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

export const deleteQuesReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_QUESTION_REQUEST:
      return {
        ...state,
        loading: true,
        isDeleted: false
      };
    case DELETE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case DELETE_QUESTION_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_QUESTION_RESET:
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

export const updatequestionReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_QUESTION_REQUEST:
        return {
          ...state,
          loading: true,
          isUpdated:false
        };
      case UPDATE_QUESTION_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case UPDATE_QUESTION_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_QUESTION_RESET:
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


  export const singlequestionReducer = (state = { singlequestion: [] }, action) => {
    switch (action.type) {
        case SINGLE_QUESTION_REQUEST:
            return {
                loading: true,
                singlequestion: [],
        };
        case SINGLE_QUESTION_SUCCESS:
            return {
                loading: false,
                singlequestion: action.payload,
        };
        case SINGLE_QUESTION_FAIL:
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