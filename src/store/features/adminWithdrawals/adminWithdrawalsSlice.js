// Corrected withdrawalsSlice
import { createSlice } from '@reduxjs/toolkit';
import { fetchWithdrawals } from './adminWithdrawalsThunk';

const initialState = {
    withdrawals: [],
    loading: false,
    error: null,
};

const withdrawalsSlice = createSlice({
    name: 'withdrawals',
    initialState,
    reducers: {
        // Optional additional reducers here
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWithdrawals.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWithdrawals.fulfilled, (state, action) => {
                state.loading = false;
                state.withdrawals = action.payload.transactions; // Changed from state.deposits to state.withdrawals
            })
            .addCase(fetchWithdrawals.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default withdrawalsSlice.reducer;