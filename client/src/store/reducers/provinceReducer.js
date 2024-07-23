import actionTypes from "../actions/actionTypes";

const initialState = {
  listProvince: [],
};
const provinceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIST_PROVINCE_SUCCESS:
      return { ...state, listProvince: action.data };
    case actionTypes.GET_LIST_PROVINCE_FAIL:
      return { ...state, listProvince: [] };
    default:
      return state;
  }
};

export default provinceReducer;
