import axios from "axios";
const API = process.env.REACT_APP_API_URL;

export async function fetchProducts() {
  const resp = await axios.get(`${API}/products`);
  return resp.data;
}