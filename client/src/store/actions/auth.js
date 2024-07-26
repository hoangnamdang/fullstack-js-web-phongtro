import { handleLogin, handleRegister } from "../../services/auth";
import actionTypes from "./actionTypes";

export const register = (data) => async (dispatch) => {
  try {
    const response = await handleRegister(data);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        data: response.data.data,
        token: response.data.token,
        msg: response.data.msg,
      });
    } else {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        data: null,
        token: null,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      data: null,
      token: null,
      msg: error,
    });
  }
};

export const login = (data) => async (dispatch) => {
  try {
    const response = await handleLogin(data);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: response.data.data,
        token: response.data.token,
        msg: response.data.msg,
      });
    } else {
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        data: null,
        token: null,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.LOGIN_FAIl,
      data: null,
      token: null,
      msg: error,
    });
  }
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
    data: null,
  };
};
