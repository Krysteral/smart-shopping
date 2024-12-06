import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchStores = (location) => axios.get(`${API_URL}/api/stores`, { params: { location } });
