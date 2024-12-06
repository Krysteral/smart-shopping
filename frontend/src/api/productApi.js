import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchProducts = () => axios.get(`${API_URL}/api/products`);
export const createProduct = (data) => axios.post(`${API_URL}/api/products`, data);
export const matchProducts = (data) => axios.post(`${API_URL}/api/product-matching`, data);
