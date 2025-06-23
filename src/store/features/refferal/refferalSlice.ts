import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchReferralCode, submitReferral } from "./refferalThunk";
import { RootState } from "../../store";

interface ReferralState {
  code: string | null;
  loading: boolean;
  error: string | null;
  submitSuccess: boolean;
}

const initialState: ReferralState = {
  code: null,
  loading: false,
  error: null,
  submitSuccess: false,
};

const referralSlice = createSlice({
  name: "referral",
  initialState,
  reducers: {
    clearReferralState: (state) => {
      state.code = null;
      state.loading = false;
      state.error = null;
      state.submitSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReferralCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReferralCode.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.code = action.payload;
      })
      .addCase(fetchReferralCode.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch referral code";
      })

      .addCase(submitReferral.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.submitSuccess = false;
      })
      .addCase(submitReferral.fulfilled, (state) => {
        state.loading = false;
        state.submitSuccess = true;
      })
      .addCase(submitReferral.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to submit referral";
        state.submitSuccess = false;
      });
  },
});

export const { clearReferralState } = referralSlice.actions;

export const selectReferralState = (state: RootState) => state.referral;

export default referralSlice.reducer;
