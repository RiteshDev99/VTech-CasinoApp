import { createSlice } from "@reduxjs/toolkit";
import { fetchSpinLogs } from "./adminSpinLogsThunk";

const initialState = {
    spins: [],       // This holds the array of spin logs
    loading: false,  // Indicates if data is being fetched
    error: null,     // Stores any error message
};

const adminSpinLogsSlice = createSlice({
    name: "adminSpinLogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSpinLogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSpinLogs.fulfilled, (state, action) => {
                state.loading = false;
                state.spins = action.payload.spins; // Set spins from response
            })
            .addCase(fetchSpinLogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch spin logs";
            });
    },
});

export default adminSpinLogsSlice.reducer;
