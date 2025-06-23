import axios from 'axios'
const API_URL = 'https://spine.onrender.com/api/admin';

export const getDashboard = async (data, token) => {
    const response = await axios.get(`${API_URL}/dashboard`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params: data,
    });
    return response.data;
};