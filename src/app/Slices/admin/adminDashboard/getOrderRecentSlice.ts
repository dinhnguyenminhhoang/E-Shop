// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getOrderRecent } from "@/app/action/adminAction/adminDashboard";

const getOrderRecentSlice = createSlice({
    name: "get-order-rêcnt",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getOrderRecent.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getOrderRecent.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getOrderRecent.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default getOrderRecentSlice.reducer;
