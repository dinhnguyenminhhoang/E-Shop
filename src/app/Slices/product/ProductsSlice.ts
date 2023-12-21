import { ProductType } from "../../../common/product";
// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getAllProduct } from "../../action/product";

const PosterSaleSlice = createSlice({
    name: "products",
    initialState: {
        data: [],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getAllProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
            });
    },
});

export default PosterSaleSlice.reducer;
