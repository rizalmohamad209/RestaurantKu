import axios from "axios";
import { config } from "../config/config";

export async function getProducts(params) {
  return await axios.get(`${config.api_host}/api/products`, {
    params,
  });
}
