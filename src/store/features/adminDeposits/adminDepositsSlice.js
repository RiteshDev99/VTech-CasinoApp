import { createSlice } from '@reduxjs/toolkit';
import { fetchDeposits } from './adminDepositsThunk'; // Adjust this import path as needed

const initialState = {
    deposits: [],
    loading: false,
    error: null,
};

const depositsSlice = createSlice({
    name: 'deposits',
    initialState,
    reducers: {
        // Optional additional reducers here
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDeposits.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDeposits.fulfilled, (state, action) => {
                state.loading = false;
                state.deposits = action.payload.transactions;
            })
            .addCase(fetchDeposits.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default depositsSlice.reducer;
