const { default: actionTypes } = require("../actions/actionTypes");

const initialState = {
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_POST_SUCCESS:
      return { ...state, posts: action.data };
    case actionTypes.GET_ALL_POST_FAIL:
      return { ...state, posts: action.data };
    default:
      return state;
  }
};

export default postReducer;
