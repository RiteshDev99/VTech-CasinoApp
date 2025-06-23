import axios from 'axios'

const API_URL = 'https://spine.onrender.com/api';


export const getPlansApi = async (token:string) => {
    const response = await axios.get(`${API_URL}/invest/plans`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
export const getActiveInvestments = async (token:string) => {
    const response = await axios.get(`${API_URL}/invest/active`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getInvestmentsHistory = async (token:string) => {
    const response = await axios.get(`${API_URL}/invest/history`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
export const subscribeInvestment = async (id: string, data: any, token: string) => {
    const response = await axios.post(`${API_URL}/invest/subscribe/${id}`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
};