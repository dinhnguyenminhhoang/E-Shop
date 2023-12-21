// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { adminListOrder } from "@/app/action/adminAction/adminOrder";

const AdminGetListOrderSlice = createSlice({
    name: "list-order-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminListOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminListOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(adminListOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetListOrderSlice.reducer;
