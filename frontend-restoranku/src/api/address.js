import axios from "axios";
import { config } from "../config/config";

export async function getAddress() {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  if (!token) return;

  return await axios.get(`${config.api_host}/api/pengiriman`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export async function saveAddress(payload) {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};
  if (!token) return;

  return await axios.post(`${config.api_host}/api/pengiriman/`, payload, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
