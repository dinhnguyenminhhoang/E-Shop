// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { adminDeleteProduct } from "@/app/action/adminAction/adminProduct";

const AdminDeleteProduct = createSlice({
    name: "delete-product-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminDeleteProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminDeleteProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(adminDeleteProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminDeleteProduct.reducer;
