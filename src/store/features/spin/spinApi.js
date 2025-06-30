// src/services/spinAPI.js
import axios from 'axios';
import { getToken } from './authTokenHelper'; // Assume this fetches JWT from storage


const API_URL = 'https://spine.onrender.com/api/spin';

export const purchaseSpinAPI = async (spinCount) => {
    const token = await getToken();
    const response = await axios.post(`${API_URL}/purchase`, { spinCount }, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const playSpinAPI = async () => {
    const token = await getToken();
    const response = await axios.get(`${API_URL}/play`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getSpinLogsAPI = async () => {
    const token = await getToken();
    const response = await axios.get(`${API_URL}/logs`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const getPrizeListAPI = async () => {
    const token = await getToken();
    const response = await axios.get(`${API_URL}/prizelist`, {
      headers: {Authorization: `Bearer ${token}` },
    });
  
    return response.data;
  };





