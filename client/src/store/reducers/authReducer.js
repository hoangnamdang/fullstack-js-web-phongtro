import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  token: null,
  data: null,
  msg: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        data: action.data,
        token: action.token,
        msg: action.msg,
      };
    case actionTypes.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        data: null,
        token: null,
        msg: action.msg,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        data: action.data,
        token: action.token,
        msg: action.msg,
      };
    case actionTypes.LOGIN_FAIl:
      return {
        ...state,
        isLoggedIn: false,
        data: null,
        token: null,
        msg: action.msg,
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        data: null,
        token: null,
        msg: "",
      };
    default:
      return state;
  }
};

export default authReducer;
