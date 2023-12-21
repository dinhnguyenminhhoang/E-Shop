// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getAllDiscount } from "@/app/action/adminAction/adminDiscount";

const AdminGetAllDiscount = createSlice({
    name: "get-all-discount-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllDiscount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllDiscount.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getAllDiscount.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetAllDiscount.reducer;
