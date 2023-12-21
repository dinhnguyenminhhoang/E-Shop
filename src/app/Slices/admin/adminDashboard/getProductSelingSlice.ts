// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getProductSeling } from "@/app/action/adminAction/adminDashboard";

const AdminGetProductSeling = createSlice({
    name: "get-list-product-sealing",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductSeling.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProductSeling.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getProductSeling.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetProductSeling.reducer;
