// reducer.js
import { cancelOrder } from "@/app/action/Order";
import { createSlice } from "@reduxjs/toolkit";

const cancelOrderSlice = createSlice({
    name: "cancel-Order",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(cancelOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(cancelOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(cancelOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
            });
    },
});

export default cancelOrderSlice.reducer;
