import { handleCategory } from "../../services/app";
import actionTypes from "./actionTypes";

export const getCategory = () => async (dispatch) => {
  try {
    const response = await handleCategory();
    if (response.data.status === 0) {
      dispatch({
        type: actionTypes.GET_CATEGORY_SUCCESS,
        data: response.data.data,
      });
    } else {
      dispatch({
        type: actionTypes.GET_CATEGORY_SUCCESS,
        data: [],
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CATEGORY_FAIL,
      data: [],
    });
  }
};
