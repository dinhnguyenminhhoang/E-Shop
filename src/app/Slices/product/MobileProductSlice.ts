// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getMobileProduct } from "../../action/product";

const MobileProductSlice = createSlice({
    name: "mobile-product",
    initialState: {
        data: [],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMobileProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMobileProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getMobileProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
            });
    },
});

export default MobileProductSlice.reducer;
