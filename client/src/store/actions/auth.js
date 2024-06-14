import { handleRegister } from "../../services/auth";
import actionTypes from "./actionTypes";

export const register = (data) => async (dispatch) => {
  try {
    const response = await handleRegister(data);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        data: response.data.token,
        msg: response.data.msg,
      });
    } else {
      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        data: null,
        msg: response.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.REGISTER_FAIL,
      data: null,
    });
  }
};

export const logout = () => {
  return {
    type: actionTypes.LOGOUT,
    data: null,
  };
};
