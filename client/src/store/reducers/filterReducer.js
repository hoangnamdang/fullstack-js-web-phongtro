import actionTypes from "../actions/actionTypes";
const initialState = {
  dataFilterPrice: [],
  datFilerAcreage: [],
};
const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_FILTER_PRICE_SUCCESS:
      return { ...state, dataFilterPrice: action.data };
    case actionTypes.GET_FILTER_PRICE_FAIL:
      return { ...state, dataFilterPrice: [] };
    case actionTypes.GET_FILTER_ACREAGE_SUCCESS:
      return { ...state, datFilerAcreage: action.data };
    case actionTypes.GET_FILTER_ACREAGE_FAIL:
      return { ...state, datFilerAcreage: [] };
    default:
      return state;
  }
};

export default filterReducer;
