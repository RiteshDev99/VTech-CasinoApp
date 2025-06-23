import axios from 'axios'
const API_URL = 'https://spine.onrender.com/api/admin';

export const getInvestemntUsers = async (data, token) => {
    const response = await axios.get(`${API_URL}/userinvestments`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        params: data,
    });
    return response.data;
};

export const postInvestemnts = async (requestData, token) => {
    const response = await axios.post(`${API_URL}/investment/plan`, requestData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const updateInvestemnts = async (id, updatedData, token) => {
    const response = await axios.put(`${API_URL}/investment/updateplan/${id}`, updatedData, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};