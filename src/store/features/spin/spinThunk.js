// src/redux/thunks/spinThunk.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  playSpinAPI,
  purchaseSpinAPI,
  getSpinLogsAPI,
  getPrizeListAPI
} from '../../services/spinAPI';

export const purchaseSpin = createAsyncThunk(
  'spin/purchaseSpin',
  async (spinCount, { rejectWithValue }) => {
    try {
      return await purchaseSpinAPI(spinCount);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to purchase spins');
    }
  }
);

export const playSpin = createAsyncThunk(
  'spin/playSpin',
  async (_, { rejectWithValue }) => {
    try {
      return await playSpinAPI();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to play spin');
    }
  }
);

export const getSpinLogs = createAsyncThunk(
  'spin/getSpinLogs',
  async (_, { rejectWithValue }) => {
    try {
      return await getSpinLogsAPI();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch spin logs');
    }
  }
);

export const fetchPrizeList = createAsyncThunk(
  'spin/fetchPrizeList',
  async (_, { rejectWithValue }) => {
    try {
      return await getPrizeListAPI()
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || 'Failed to fetch prizes'
      );
    }
  }
);
