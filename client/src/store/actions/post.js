import { apiGetAllPost } from "../../services/post";
import actionTypes from "./actionTypes";

export const getAllPost = () => async (dispatch) => {
  try {
    const response = await apiGetAllPost();
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.GET_ALL_POST_SUCCESS,
        msg: response.data.msg,
        data: response.data.data,
      });
    } else {
      dispatch({
        type: actionTypes.GET_ALL_POST_SUCCESS,
        msg: response.data.msg,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ALL_POST_FAIL,
      msg: error,
      data: null,
    });
  }
};
