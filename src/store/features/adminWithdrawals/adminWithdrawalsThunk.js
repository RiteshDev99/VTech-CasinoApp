import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWithdrawals } from "./adminWithdrawalsApi";

export const fetchWithdrawals = createAsyncThunk(
    'withdrawals/fetchWithdrawals',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            if (!token) throw new Error('No authentication token found');

            const requestData = {}; // or whatever data your backend expects
            const data = await getWithdrawals(requestData, token);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);
