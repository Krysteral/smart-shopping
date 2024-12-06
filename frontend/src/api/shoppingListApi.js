import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchShoppingLists = () => axios.get(`${API_URL}/api/shopping-lists`);
export const createShoppingList = (data) => axios.post(`${API_URL}/api/shopping-lists`, data);
