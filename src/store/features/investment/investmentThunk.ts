import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getPlansApi,
    getActiveInvestments,
    getInvestmentsHistory,
    subscribeInvestment
} from './investmentAPI';
import { RootState } from '../../store';
export const getPlans = createAsyncThunk(
    'investment/getPlans',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = (getState() as RootState).auth.token;
            const data = await getPlansApi(token!);
            return data.plans;
        } catch (error: any) {
            const message = error?.response?.data?.message || error.message || 'Failed to fetch plans';
            return rejectWithValue(message);
        }
    }
);
export const fetchActiveInvestments = createAsyncThunk(
    'investment/fetchActiveInvestments',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = (getState() as RootState).auth.token;
            if (!token) throw new Error('No authentication token found');
            const data = await getActiveInvestments(token);
            return data;
        } catch (error: any) {
            const message = error?.response?.data?.message || error.message || 'Failed to fetch active investments';
            return rejectWithValue(message);
        }
    }
);
export const fetchInvestmentsHistory = createAsyncThunk(
    'investment/fetchInvestmentsHistory',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = (getState() as RootState).auth.token;
            if (!token) throw new Error('No authentication token found');
            const data = await getInvestmentsHistory(token);
            return data;
        } catch (error: any) {
            const message = error?.response?.data?.message || error.message || 'Failed to fetch investment history';
            return rejectWithValue(message);
        }
    }
);

export const getSubscribeInvestments = createAsyncThunk(
    'investment/getSubscribeInvestments',
    async ({ id, data }: any, { getState, rejectWithValue }) => {
        try {
            const token = (getState() as RootState).auth.token;
            if (!token) throw new Error('No authentication token found');
            const response = await subscribeInvestment(id, data, token);
            return response.data;
        } catch (error: any) {
            const message = error?.response?.data?.message || error.message || 'Failed to subscribe';
            return rejectWithValue(message);
        }
    }
);
