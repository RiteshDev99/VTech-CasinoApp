import { createAsyncThunk } from '@reduxjs/toolkit';
import { getWalletBalance } from './walletApi';

export const fetchWalletBalance = createAsyncThunk(
    'walletBalance/fetchWalletBalance',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token; // ✅ get token from Redux
            const data = await getWalletBalance(token);
            return data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || error.message || 'Failed to fetch referral code'
            );
        }
    }
);
