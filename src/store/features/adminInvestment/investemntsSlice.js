import { createSlice } from "@reduxjs/toolkit";
import { fetchInvestmentsUser, addInvestments, updateInvestment } from "./investmentsThunk";

const initialState = {
    investments: [],
    loading: false,
    error: null,
    addInvestmentResult: null,
};

const investmentsSlice = createSlice({
    name: "adminInvestment", // Changed to match what component expects
    initialState,
    reducers: {
        clearInvestmentsState: (state) => {
            state.investments = [];
            state.error = null;
            state.addInvestmentResult = null;
        },
        resetInvestmentError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        // Unified builder chain
        builder
            // Fetch cases
            .addCase(fetchInvestmentsUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchInvestmentsUser.fulfilled, (state, action) => {
                state.loading = false;
                state.investments = action.payload.investments || action.payload;
            })
            .addCase(fetchInvestmentsUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to fetch investments";
            })

            // Add investment cases
            .addCase(addInvestments.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.addInvestmentResult = null;
            })
            .addCase(addInvestments.fulfilled, (state, action) => {
                state.loading = false;
                state.addInvestmentResult = action.payload;
                // Optionally add to investments array immediately
                if (action.payload?.investment) {
                    state.investments.push(action.payload.investment);
                }
            })
            .addCase(addInvestments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to add investment";
            })

            .addCase(updateInvestment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateInvestment.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                // Update investments array or state here if needed
                // e.g., find the plan by id and replace it
            })
            .addCase(updateInvestment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { clearInvestmentsState, resetInvestmentError } = investmentsSlice.actions;
export default investmentsSlice.reducer;