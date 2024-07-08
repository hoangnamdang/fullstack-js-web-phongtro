import { apiGetAllPost, apiGetPostsByLimit } from "../../services/post";
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

export const getPostsByLimit = (page) => async (dispatch) => {
  try {
    const limit = Number(process.env.REACT_APP_LIMIT_POST) || 10;
    const response = await apiGetPostsByLimit(page, limit);
    const countPost = response.data.data.count;
    const listPost = response.data.data.rows;
    const totalPage = Math.floor(countPost / limit);
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.GET_POST_BY_LIMIT_SUCCESS,
        msg: response.data.msg,
        data: { totalPage, listPost },
      });
    } else {
      dispatch({
        type: actionTypes.GET_POST_BY_LIMIT_SUCCESS,
        msg: response.data.msg,
        data: { totalPage: 0, listPost: [] },
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POST_BY_LIMIT_FAIL,
      msg: error,
      data: null,
    });
  }
};
