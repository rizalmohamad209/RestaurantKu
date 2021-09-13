import axios from "axios";
import { config } from "../config/config";
import store from "../app/store";
import { setItem } from "../features/Carts/actions";

export async function saveCart(token, cart) {
  if (!token) return;
  return await axios.put(`${config.api_host}/api/cart/`, cart, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export async function getCart() {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  if (!token) return;

  let { data } = await axios.get(`${config.api_host}/api/cart/`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  console.log("====================================");
  console.log("ini data pada get cart", data.data);
  console.log("====================================");
  if (!data.error) {
    store.dispatch(setItem(data.data));
    console.log("====================================");
    console.log("ini data", data.data);
    console.log("====================================");
  }
}

export async function deleteCart(id) {
  console.log("====================================");
  console.log("ini id item", id);
  console.log("====================================");
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  if (!token) return;

  await axios.delete(`${config.api_host}/api/cart/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
