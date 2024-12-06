import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getShoppingLists = async () => {
  const response = await axios.get(`${API_URL}/api/shoppingLists`);
  return response.data;
};

export const createShoppingList = async (data) => {
  const response = await axios.post(`${API_URL}/api/shoppingLists`, data);
  return response.data;
};

export const deleteShoppingList = async (id) => {
  await axios.delete(`${API_URL}/api/shoppingLists/${id}`);
};
