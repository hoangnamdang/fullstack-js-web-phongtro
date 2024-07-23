import { apiGetListProvince } from "../../services/province";
import actionTypes from "./actionTypes";

export const getListProvince = () => async (dispatch) => {
  try {
    const response = await apiGetListProvince();
    if (response.data.err === 0) {
      dispatch({
        type: actionTypes.GET_LIST_PROVINCE_SUCCESS,
        msg: response.data.msg,
        data: response.data.data,
      });
    } else {
      dispatch({
        type: actionTypes.GET_LIST_PROVINCE_SUCCESS,
        msg: response.data.msg,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_LIST_PROVINCE_FAIL,
      msg: error,
      data: null,
    });
  }
};
