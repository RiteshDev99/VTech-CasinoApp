import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRefferalCode, subscribeReferral } from './refferalApi';

export const fetchReferralCode = createAsyncThunk(
  'referral/fetchReferralCode',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = (getState() as any).auth.token;
      const data = await getRefferalCode(token);
      return data;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch referral code'
      );
    }
  }
);

export const submitReferral = createAsyncThunk(
  'referral/submitReferral',
  async (
    { referralCode }: { referralCode: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const token = (getState() as any).auth.token;
      const response = await subscribeReferral(token, referralCode);
      return response;
    } catch (error) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Referral submission failed'
      );
    }
  }
);
