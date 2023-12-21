// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { adminUpdateEmployee } from "@/app/action/adminAction/adminEmployees";

const AdminUpdateEmployee = createSlice({
    name: "update-employee-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminUpdateEmployee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminUpdateEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(adminUpdateEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminUpdateEmployee.reducer;
