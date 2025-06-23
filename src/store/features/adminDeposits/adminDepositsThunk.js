import { createAsyncThunk } from "@reduxjs/toolkit";
import { getDeposits } from "./adminDepositsApi";

export const fetchDeposits = createAsyncThunk(
    'Deposits/fetchDeposits',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            if (!token) throw new Error('No authentication token found');

            const requestData = {}; // or whatever data your backend expects
            const data = await getDeposits(requestData, token);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);
