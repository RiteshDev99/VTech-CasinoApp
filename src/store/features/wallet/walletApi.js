import axios from 'axios'

const API_URL = 'https://spine.onrender.com/api';


export const getWalletBalance = async (token) => {
    const response = await axios.get(`${API_URL}/wallet/balance`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};