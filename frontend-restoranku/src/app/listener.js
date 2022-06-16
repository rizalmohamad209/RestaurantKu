import store from "./store";
import { saveCart } from "../api/cart";

let currentCart;
let currentAuth;

function listener() {
  let previousAuth = currentAuth;
  let previousCart = currentCart;
  currentAuth = store.getState().auth;
  currentCart = store.getState().carts;

  console.log("ini current cart", currentCart);
  console.log("ini prev cart", previousCart);
  let { token } = currentAuth;

  if (currentAuth !== previousAuth) {
    localStorage.setItem("auth", JSON.stringify(currentAuth));
    saveCart(token, currentCart);
  }

  if (previousCart !== currentCart) {
    localStorage.setItem("cart", JSON.stringify(currentCart));
    saveCart(token, currentCart);
  }
}

function listen() {
  store.subscribe(listener);
}

export { listen };
