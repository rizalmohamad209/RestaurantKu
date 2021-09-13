import { getProducts } from "../../api/product";
import debounce from "debounce-promise";
import {
  ERROR_FETCHING_PRODUCT,
  SET_CATEGORY,
  SET_KEYWORD,
  SET_TAGS,
  TOGGLE_TAG,
  START_FETCHING_PRODUCT,
  SUCCESS_FETCHING_PRODUCT,
} from "./constants";

let debouncedFetchProducts = debounce(getProducts, 1000);

export const startFetchingProducts = () => {
  return {
    type: START_FETCHING_PRODUCT,
  };
};

export const fetchingProducts = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingProducts);

    let tagsi = getState().products.tagsi || [];
    let keyword = getState().products.keyword || "";
    let categori = getState().products.categori || "";

    const params = {
      q: keyword,
      categori,
      tagsi,
    };
    console.log("====================================");
    console.log(params);
    console.log("====================================");

    try {
      let {
        data: { data, count },
      } = await debouncedFetchProducts(params);
      dispatch(succesFetchingProducts({ data, count }));
    } catch (err) {
      dispatch(errorFetchingProducts());
    }
  };
};

export const errorFetchingProducts = () => {
  return {
    type: ERROR_FETCHING_PRODUCT,
  };
};

export const succesFetchingProducts = ({ data, count }) => {
  return {
    type: SUCCESS_FETCHING_PRODUCT,
    data,
    count,
  };
};

export const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

export const setCategory = (categori) => {
  return {
    type: SET_CATEGORY,
    categori,
  };
};

export const setTags = (tagsi) => {
  return {
    type: SET_TAGS,
    tagsi,
  };
};

export const toggleTag = (tag) => {
  return {
    type: TOGGLE_TAG,
    tag,
  };
};
