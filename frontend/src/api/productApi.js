import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/api/products`);
  return response.data;
};

export const createProduct = async (data) => {
  const response = await axios.post(`${API_URL}/api/products`, data);
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await axios.put(`${API_URL}/api/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/api/products/${id}`);
};
