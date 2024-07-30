import actionTypes from "../actions/actionTypes";

const initialState = {
  posts: [],
  dataPostPagination: {
    totalPage: 0,
    listPost: [],
  },
  newsPost: [],
  listPostDemoUpdate: [],
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
    case actionTypes.GET_NEWS_POST_SUCCESS: {
      return { ...state, newsPost: action.data };
    }
    case actionTypes.GET_NEWS_POST_FAIL: {
      return { ...state, newsPost: [] };
    }
    case actionTypes.GET_POST_DEMO_UPDATE_SUCCESS: {
      return { ...state, listPostDemoUpdate: action.data };
    }
    case actionTypes.GET_POST_DEMO_UPDATE_FAIL: {
      return { ...state, listPostDemoUpdate: [] };
    }
    default:
      return state;
  }
};

export default postReducer;
