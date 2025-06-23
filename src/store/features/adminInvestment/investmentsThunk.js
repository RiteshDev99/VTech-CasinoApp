import { createAsyncThunk } from "@reduxjs/toolkit";
import { getInvestemntUsers, postInvestemnts, updateInvestemnts } from "./investmentsApi";

export const fetchInvestmentsUser = createAsyncThunk(
    'investment/fetchUser',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            if (!token) throw new Error('No authentication token found');

            const requestData = {}; // or whatever data your backend expects
            const data = await getInvestemntUsers(requestData, token);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


export const addInvestments = createAsyncThunk(
    'investments/addInvestments',
    async (requestData, { getState, rejectWithValue }) => { // Receive requestData as parameter
        try {
            const token = getState().auth.token;
            if (!token) throw new Error('No authentication token found');

            const data = await postInvestemnts(requestData, token);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);


export const updateInvestment = createAsyncThunk(
    'investments/updateInvestment',
    async ({ id, updateData }, { getState, rejectWithValue }) => { // Receive requestData as parameter
        try {
            const token = getState().auth.token;
            if (!token) throw new Error('No authentication token found');

            const data = await updateInvestemnts(id, updateData, token);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);
