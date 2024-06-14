import { handleCategory } from "../../services/category";
import actionTypes from "./actionTypes";

export const getCategory = () => async (dispatch) => {
  try {
    const response = await handleCategory();
    console.log(response);
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
