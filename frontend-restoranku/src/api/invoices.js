import axios from 'axios'
import { config } from '../config/config'

export async function getInvoiceById(order_id) {
    let { token } = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : {}

    return await axios.get(`${config.api_host}/api/invoices/${order_id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}