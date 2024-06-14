import actionTypes from "../actions/actionTypes";

const initialState = {
  category: [],
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORY_SUCCESS:
      return { ...state, category: action.data };
    default:
      return state;
  }
};

export default categoryReducer;
