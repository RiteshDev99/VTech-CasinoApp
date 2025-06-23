import { createSlice } from "@reduxjs/toolkit"
import { fetchAllPLans } from "./adminPlansThunk"

const plansSlice = createSlice({
    name: 'plans',
    initialState: {
        plans: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPLans.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchAllPLans.fulfilled, (state, action) => {
                state.loading = false
                state.plans = action.payload.data;
            })
            .addCase(fetchAllPLans.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export default plansSlice.reducer