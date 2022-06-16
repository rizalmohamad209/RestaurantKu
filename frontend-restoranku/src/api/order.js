import axios from "axios";
import { config } from "../config/config";

export async function getOrders() {
    let { token } = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : {};
    return await axios.get(`${config.api_host}/api/order`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}


export async function createOrder(payload) {
    let { token } = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : {};

    return await axios.post(`${config.api_host}/api/order`, payload, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}