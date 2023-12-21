// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { adminUpdateProduct } from "@/app/action/adminAction/adminProduct";

const AdminUpdateProduct = createSlice({
    name: "update-product-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminUpdateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminUpdateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(adminUpdateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminUpdateProduct.reducer;
