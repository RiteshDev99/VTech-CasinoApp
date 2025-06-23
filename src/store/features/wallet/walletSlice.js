import { createSlice } from '@reduxjs/toolkit';
import { fetchWalletBalance } from './walletThunk';

const initialState = {
    balance: null,
    loading: false,
    error: null,
};

const walletBalanceSlice = createSlice({
    name: 'walletBalance',
    initialState,
    reducers: {
        clearWalletBalanceState: (state) => {
            state.balance = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWalletBalance.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWalletBalance.fulfilled, (state, action) => {
                state.loading = false;
                state.balance = action.payload; // assuming API returns { balance: ... }
            })
            .addCase(fetchWalletBalance.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearWalletBalanceState } = walletBalanceSlice.actions;

export default walletBalanceSlice.reducer;
