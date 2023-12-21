// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { adminCreateProduct } from "@/app/action/adminAction/adminProduct";

const AdminCreateNewProduct = createSlice({
    name: "cretae-new-product-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminCreateProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminCreateProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(adminCreateProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminCreateNewProduct.reducer;
