import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getStores = async (location) => {
  const response = await axios.get(`${API_URL}/api/stores?location=${location}`);
  return response.data;
};
