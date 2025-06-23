import axios from 'axios'
const API_URL = 'https://spine.onrender.com/api/admin';

export const getSpinLogs = async (data, token) => {
    const response = await axios.get(`${API_URL}/spins/logs`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params: data,
    });
    return response.data;
};