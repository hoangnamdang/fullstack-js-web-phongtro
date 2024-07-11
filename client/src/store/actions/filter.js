import { apiGetFilterAcreage, apiGetFilterPrice } from "../../services/filter";
import actionType from "./actionTypes";

export const getFilterPrice = () => async (dispatch) => {
  try {
    const response = await apiGetFilterPrice();
    if (response.data.err === 0) {
      dispatch({
        type: actionType.GET_FILTER_PRICE_SUCCESS,
        msg: response.data.msg,
        data: response.data.data,
      });
    } else {
      dispatch({
        type: actionType.GET_FILTER_PRICE_SUCCESS,
        msg: response.data.msg,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_FILTER_PRICE_FAIL,
      msg: error,
      data: null,
    });
  }
};

export const getFilterAcreage = () => async (dispatch) => {
  try {
    const response = await apiGetFilterAcreage();
    if (response.data.err === 0) {
      dispatch({
        type: actionType.GET_FILTER_ACREAGE_SUCCESS,
        msg: response.data.msg,
        data: response.data.data,
      });
    } else {
      dispatch({
        type: actionType.GET_FILTER_ACREAGE_SUCCESS,
        msg: response.data.msg,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionType.GET_FILTER_ACREAGE_FAIL,
      msg: error,
      data: null,
    });
  }
};
