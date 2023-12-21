// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getSupplier } from "@/app/action/adminAction/adminSupplier";

const AdminGetSupplierSlice = createSlice({
    name: "get-supplier",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getSupplier.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSupplier.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getSupplier.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetSupplierSlice.reducer;
