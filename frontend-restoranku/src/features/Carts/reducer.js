import { ADD_ITEM, REMOVE_ITEM, CLEAR_ITEM, SET_ITEM } from "./constants";
const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

export default function reducer(state = initialState, action) {
  console.log("====================================");
  console.log("ini redux cart", state);
  console.log("====================================");

  switch (action.type) {
    case ADD_ITEM:
      if (state.find((item) => item.id === action.item.id)) {
        return state.map((item) => ({
          ...item,
          qty: item.id === action.item.id ? item.qty + 1 : item.qty,
        }));
      } else {
        return [...state, { ...action.item, qty: 1 }];
      }
    case REMOVE_ITEM:
      return state
        .map((item) => ({
          ...item,
          qty: item.id === action.item.id ? item.qty - 1 : item.qty,
        }))
        .filter((item) => item.qty > 0);
    case CLEAR_ITEM:
      return [];
    case SET_ITEM:
      return action.items;
    default:
      return state;
  }
}
