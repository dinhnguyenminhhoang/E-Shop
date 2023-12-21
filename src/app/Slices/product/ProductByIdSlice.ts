import { createSlice } from "@reduxjs/toolkit";
import { getProductById } from "../../action/product";

const ProductByIdSlice = createSlice({
    name: "productDetail",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getProductById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
            });
    },
});
export default ProductByIdSlice.reducer;
