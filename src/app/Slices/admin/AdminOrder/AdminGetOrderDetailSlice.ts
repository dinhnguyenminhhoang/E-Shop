// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { adminGetOrderDetail } from "@/app/action/adminAction/adminOrder";

const AdminGetOrderDetailSlice = createSlice({
    name: "detail-order-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminGetOrderDetail.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminGetOrderDetail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(adminGetOrderDetail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetOrderDetailSlice.reducer;
