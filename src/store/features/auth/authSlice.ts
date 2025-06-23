import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateUserDetails } from './authThunk';

interface Wallet {
    balance?: number;
    lockedBalance?: number;
    bonus?: number;
}

interface UserDetails {
    _id?: string;
    username?: string;
    name?: string;
    email?: string;
    mobile?: string;
    gender?: string;
    dob?: string;
    avatar?: string;
    wallet?: Wallet;
}

interface AuthState {
    user: UserDetails | null;
    loading: boolean;
    token: string | null;
    error: any;
    basicUser: UserDetails | null;
    userDetails: UserDetails | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    token: null,
    error: null,
    basicUser: null,
    userDetails: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signInStart(state) {
            state.loading = true;
            state.error = null;
        },
        signInSuccess(state, action: PayloadAction<{ token: string; user: UserDetails }>) {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        signInFailure(state, action: PayloadAction<any>) {
            state.loading = false;
            state.error = action.payload;
        },
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<{ token: string; user: UserDetails }>) {
            const { token, user } = action.payload;
            state.token = token;
            if (user) {
                state.user = user;
            } else {
                console.warn('No user data returned in login response');
                state.user = null;
            }
            state.loading = false;
            state.error = null;
            state.basicUser = user;
        },
        loginFailure(state, action: PayloadAction<any>) {
            state.error = action.payload;
            state.loading = false;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.basicUser = null;
            state.userDetails = null;
            state.loading = false;
            state.error = null;
        },
        setUserDetails(state, action: PayloadAction<UserDetails>) {
            state.userDetails = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUserDetails.fulfilled, (state, action: PayloadAction<{ success: boolean; message: string; user: UserDetails }>) => {
                state.loading = false;
                const updatedUserResponse = action.payload;

                if (updatedUserResponse && updatedUserResponse.user) {
                    const updatedUser = updatedUserResponse.user;

                    state.user = {
                        ...state.user,
                        ...updatedUser,
                        wallet: updatedUser.wallet ?? state.user?.wallet,
                    };

                    state.basicUser = {
                        ...state.basicUser,
                        ...updatedUser,
                        wallet: updatedUser.wallet ?? state.basicUser?.wallet,
                    };

                    state.userDetails = {
                        ...state.userDetails,
                        ...updatedUser,
                        wallet: updatedUser.wallet ?? state.userDetails?.wallet,
                    };

                } else {
                    console.warn('⚠️ No updated user returned in updateUserDetails response');
                }
            })
            .addCase(updateUserDetails.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const {
    signInStart,
    signInSuccess,
    signInFailure,
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    setUserDetails
} = authSlice.actions;

export default authSlice.reducer;
