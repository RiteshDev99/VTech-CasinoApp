import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboard } from "./adminDashboardThunk"; // make sure to adjust the import path

const initialState = {
    data: {},
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        // You can add other synchronous reducers here if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.stats;
            })
            .addCase(fetchDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An error occurred";
            });
    },
});

export default dashboardSlice.reducer;
