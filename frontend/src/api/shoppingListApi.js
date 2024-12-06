import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getShoppingLists = async () => {
  const response = await axios.get(`${API_URL}/api/shopping-lists`);
  return response.data;
};

export const addShoppingList = async (list) => {
  const response = await axios.post(`${API_URL}/api/shopping-lists`, list);
  return response.data;
};

export const deleteShoppingList = async (id) => {
  await axios.delete(`${API_URL}/api/shopping-lists/${id}`);
};
