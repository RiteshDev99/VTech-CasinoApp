import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    getPlans,
    fetchActiveInvestments,
    fetchInvestmentsHistory,
    getSubscribeInvestments,
} from "./investmentThunk";

interface InvestmentState {
    investmentPlans:  any[];
    plansLoading: boolean;
    plansError: string | null;

    activeInvestments:  any | null [];
    activeLoading: boolean;
    activeError: string | null;

    investmentsHistory: any[];
    historyLoading: boolean;
    historyError: string | null;

    subscribeInvestmentResult: any | null;
    subscribeLoading: boolean;
    subscribeError: string | null;
}

const initialState: InvestmentState = {
    investmentPlans: [],
    plansLoading: false,
    plansError: null,

    activeInvestments: [],
    activeLoading: false,
    activeError: null,

    investmentsHistory: [],
    historyLoading: false,
    historyError: null,

    subscribeInvestmentResult: null,
    subscribeLoading: false,
    subscribeError: null,
};

const investmentSlice = createSlice({
    name: "investment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPlans.pending, (state) => {
            state.plansLoading = true;
            state.plansError = null;
        });
        builder.addCase(getPlans.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.plansLoading = false;
            state.investmentPlans = action.payload;
        });
        builder.addCase(getPlans.rejected, (state, action: any) => {
            state.plansLoading = false;
            state.plansError = action.payload || "Failed to fetch investment plans";
        });
        builder.addCase(fetchActiveInvestments.pending, (state) => {
            state.activeLoading = true;
            state.activeError = null;
        });
        builder.addCase(fetchActiveInvestments.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.activeLoading = false;
            state.activeInvestments = action.payload;
        });
        builder.addCase(fetchActiveInvestments.rejected, (state, action: any) => {
            state.activeLoading = false;
            state.activeError = action.payload || "Failed to fetch active investments";
        });
        builder.addCase(fetchInvestmentsHistory.pending, (state) => {
            state.historyLoading = true;
            state.historyError = null;
        });
        builder.addCase(fetchInvestmentsHistory.fulfilled, (state, action: PayloadAction<any[]>) => {
            state.historyLoading = false;
            state.investmentsHistory = action.payload;
        });
        builder.addCase(fetchInvestmentsHistory.rejected, (state, action: any) => {
            state.historyLoading = false;
            state.historyError = action.payload || "Failed to fetch investments history";
        });
        builder.addCase(getSubscribeInvestments.pending, (state) => {
            state.subscribeLoading = true;
            state.subscribeError = null;
        });
        builder.addCase(getSubscribeInvestments.fulfilled, (state, action: PayloadAction<any>) => {
            state.subscribeLoading = false;
            state.subscribeInvestmentResult = action.payload;
        });
        builder.addCase(getSubscribeInvestments.rejected, (state, action: any) => {
            state.subscribeLoading = false;
            state.subscribeError = action.payload || "Failed to subscribe to investment";
        });
    },
});

export default investmentSlice.reducer;
