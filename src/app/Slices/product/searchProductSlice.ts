// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { searchProduct } from "../../action/product";

const searchProductSlice = createSlice({
    name: "search-products",
    initialState: {
        data: [],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(searchProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
            });
    },
});

export default searchProductSlice.reducer;
