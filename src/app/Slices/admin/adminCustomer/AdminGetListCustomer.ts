// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getListCustomer } from "@/app/action/adminAction/adminCustomer";

const AdminGetListCustomer = createSlice({
    name: "get-list customer-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListCustomer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getListCustomer.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getListCustomer.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetListCustomer.reducer;
