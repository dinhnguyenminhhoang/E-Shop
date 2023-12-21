// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getLaptopProduct } from "../../action/product";

const LabtopProductsSlice = createSlice({
    name: "laptop-products",
    initialState: {
        data: [],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLaptopProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLaptopProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getLaptopProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
            });
    },
});

export default LabtopProductsSlice.reducer;
