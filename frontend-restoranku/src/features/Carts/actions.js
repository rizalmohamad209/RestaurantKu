import {
  ADD_ITEM,
  SET_ITEM,
  CLEAR_ITEM,
  REMOVE_ITEM,
  // DELETE_ITEM,
} from "./constants";

export function addItem(item) {
  return {
    type: ADD_ITEM,
    item,
  };
}

export function removeItem(item) {
  return {
    type: REMOVE_ITEM,
    item,
  };
}

export function clearItem() {
  return {
    type: CLEAR_ITEM,
  };
}

export function setItem(items) {
  console.log("====================================");
  console.log("ini itemssss", items);
  console.log("====================================");
  return {
    type: SET_ITEM,
    items,
  };
}
