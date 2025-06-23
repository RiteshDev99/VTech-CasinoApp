import { signInAPI, loginAPI, fetchUserDetails, updateUserProfile } from './authAPI';
import {
    signInStart,
    signInSuccess,
    signInFailure,
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    setUserDetails
} from './authSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { AppDispatch } from '../../store';


interface Wallet {
    balance: number;
}

export interface UserUpdateData {
    _id: string;
    name: string;
    email: string;
    mobile: string;
    gender: string;
    dob: string;
    wallet?: Wallet;
}

export interface UpdateUserInput {
    data: UserUpdateData;
    token: string;
}

export interface UpdateUserResponse {
    success: boolean;
    message: string;
    user: UserUpdateData;
}

export const signInUser = createAsyncThunk(
    'auth/signInUser',
    async ({ username, name, email, password, mobile, code }: {
        username: string;
        name: string;
        email: string;
        password: string;
        mobile: string;
        code: string;
    }, { dispatch, rejectWithValue }) => {
        dispatch(signInStart());
        try {
            const userData = await signInAPI({ username, name, email, password, mobile, code });
            const payload = {
                user: userData.user,
                token: userData.token,
            };
            dispatch(signInSuccess(payload));
            return payload;
        } catch (error: any) {
            console.error("Sign In Error:", error);
            return rejectWithValue(error.response?.data?.message || 'Sign In failed');
        }
    }
);

export const loginUser = ({ email, password }: {
    email: string;
    password: string;
}, navigation: any) => async (dispatch: AppDispatch) => {
    dispatch(loginStart());
    try {
        const response = await loginAPI({ email, password });
        const { token } = response;

        if (!token) throw new Error('No token returned from API');

        const decoded: any = jwtDecode(token);
        const userId = decoded.id;

        if (!userId) throw new Error('Invalid token: missing user ID');

        const userResponse = await fetchUserDetails(userId);
        const user = userResponse.user;

        const payload = { token, user };

        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('user', JSON.stringify(user));

        dispatch(loginSuccess(payload));
        if (navigation) navigation.navigate('MainTabs');

        return payload;
    } catch (error: any) {
        console.error('Login Error:', error);
        dispatch(loginFailure(error?.response?.data?.message || 'Login failed'));
        throw error;
    }
};

export const loadUserFromStorage = () => async (dispatch: AppDispatch) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const userJson = await AsyncStorage.getItem('user');
        const user = userJson ? JSON.parse(userJson) : null;

        if (token && user) {
            dispatch(loginSuccess({ user, token }));
        }
    } catch (err) {
        console.error('Failed to load user from storage', err);
    }
};

export const logoutUser = () => async (dispatch:AppDispatch) => {
    try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('user');
        dispatch(logout());
    } catch (error) {
        console.error('Logout Error:', error);
    }
};

export const getUserDetails = (employeeId?: string) => async (dispatch: AppDispatch) => {
    try {
        const data = await fetchUserDetails(employeeId);
        console.log("Fetched user details from API:", data);
        dispatch(setUserDetails(data.user));
        return data.user;
    } catch (error) {
        console.error('Failed to fetch user details:', error);
    }
};

export const updateUserDetails = createAsyncThunk<UpdateUserResponse, UpdateUserInput>(
    'profile/update',
    async ({ data, token }, { rejectWithValue }) => {
        try {
            const updatedUser = await updateUserProfile(data, token);
            console.log('Updated user:', updatedUser);
            return updatedUser;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);
