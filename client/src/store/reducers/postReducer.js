import actionTypes from "../actions/actionTypes";

const initialState = {
  posts: [],
  dataPostPagination: {
    totalPage: 0,
    listPost: [],
  },
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_POST_SUCCESS:
      return { ...state, posts: action.data };
    case actionTypes.GET_ALL_POST_FAIL:
      return { ...state, posts: action.data };
    case actionTypes.GET_POST_BY_LIMIT_SUCCESS:
      return {
        ...state,
        dataPostPagination: {
          ...state.dataPostPagination,
          totalPage: action.data.totalPage,
          listPost: action.data.listPost,
        },
      };
    case actionTypes.GET_POST_BY_LIMIT_FAIL:
      return {
        ...state,
        dataPostPagination: {
          ...state.dataPostPagination,
          totalPage: 0,
          listPost: [],
        },
      };
    default:
      return state;
  }
};

export default postReducer;
