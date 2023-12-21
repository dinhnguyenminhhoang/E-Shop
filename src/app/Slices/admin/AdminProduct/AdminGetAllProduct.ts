// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { adminAllProduct } from "@/app/action/adminAction/adminProduct";

const AdminGetAllProduct = createSlice({
    name: "get-all-product-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminAllProduct.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminAllProduct.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(adminAllProduct.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetAllProduct.reducer;
