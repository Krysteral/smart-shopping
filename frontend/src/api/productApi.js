import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/api/products`);
  return response.data;
};

export const deleteProduct = async (id) => {
  await axios.delete(`${API_URL}/api/products/${id}`);
};

export const addProduct = async (product) => {
  const response = await axios.post(`${API_URL}/api/products`, product);
  return response.data;
};

export const updateProduct = async (id, product) => {
  const response = await axios.put(`${API_URL}/api/products/${id}`, product);
  return response.data;
};
