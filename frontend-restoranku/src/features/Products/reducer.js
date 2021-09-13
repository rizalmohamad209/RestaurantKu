import {
  START_FETCHING_PRODUCT,
  ERROR_FETCHING_PRODUCT,
  SUCCESS_FETCHING_PRODUCT,
  SET_KEYWORD,
  SET_TAGS,
  SET_CATEGORY,
  TOGGLE_TAG,
} from "./constants";
const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  keyword: "",
  categori: "",
  tagsi: [],
  status: statuslist.idle,
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_PRODUCT:
      return { ...state, status: statuslist.process };
    case ERROR_FETCHING_PRODUCT:
      return { ...state, status: statuslist.error };
    case SUCCESS_FETCHING_PRODUCT:
      return {
        ...state,
        status: statuslist.success,
        data: action.data,
        totalItems: action.count,
      };
    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
        category: "",
        tagsi: [],
      };
    case SET_CATEGORY:
      return {
        ...state,
        categori: action.categori,
        tagsi: [],
        keyword: "",
      };
    case SET_TAGS:
      return {
        ...state,
        tagsi: action.tagsi,
        keyword: "",
        category: "",
      };
    case TOGGLE_TAG:
      if (!state.tagsi.includes(action.tag)) {
        return { ...state, tagsi: [...state.tagsi, action.tag] };
      } else {
        return {
          ...state,
          tagsi: state.tagsi.filter((tag) => tag !== action.tag),
        };
      }
    default:
      return state;
  }
}
