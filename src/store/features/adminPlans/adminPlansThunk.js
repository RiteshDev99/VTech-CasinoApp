import { createAsyncThunk } from "@reduxjs/toolkit";
import { getPlans } from "./adminplansApi";

export const fetchAllPLans = createAsyncThunk(
    'plans/fetchAllPLans',
    async (_, { getState, rejectWithValue }) => {
        try {
            const token = getState().auth.token;
            if (!token) throw new Error('No authentication token found');

            const requestData = {}; // or whatever data your backend expects
            const data = await getPlans(requestData, token);
            return data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

