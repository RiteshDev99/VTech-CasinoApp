import {createSlice } from '@reduxjs/toolkit';
import { playSpin, purchaseSpin, getSpinLogs, fetchPrizeList } from './spinThunk';
import { getToken } from './authTokenHelper'; // Assume this fetches JWT from storage
const initialState = {
    loading: false,
    error: null,
    spinLogs: [],
    lastSpinResult: null,
    remainingSpins: 0,
    walletBalance: 0,
    prizes: [],
};

const spinSlice = createSlice({
    name: 'spin',
    initialState,
    reducers: {
        clearSpinState: (state) => {
            state.error = null;
            state.lastSpinResult = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPrizeList.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPrizeList.fulfilled, (state, action) => {
                state.loading = false;
                state.prizes = action.payload;
            })
            .addCase(fetchPrizeList.rejected, (state, action) => {
                console.log('Error', action.payload);
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(purchaseSpin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(purchaseSpin.fulfilled, (state, action) => {
                state.loading = false;
                state.remainingSpins = action.payload.updatedSpinCount;
                state.walletBalance = action.payload.remainingBalance;
            })
            .addCase(purchaseSpin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(playSpin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(playSpin.fulfilled, (state, action) => {
                state.loading = false;
                state.lastSpinResult = action.payload.spin;
                state.remainingSpins = action.payload.userData.spinCount;
            })
            .addCase(playSpin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getSpinLogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSpinLogs.fulfilled, (state, action) => {
                state.loading = false;
                state.spinLogs = action.payload.spins;
            })
            .addCase(getSpinLogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearSpinState } = spinSlice.actions;
export default spinSlice.reducer;
