// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getListSupplier } from "@/app/action/adminAction/adminSupplier";

const AdminGetListSupplierSlice = createSlice({
    name: "get-list-supplier",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListSupplier.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getListSupplier.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getListSupplier.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetListSupplierSlice.reducer;
