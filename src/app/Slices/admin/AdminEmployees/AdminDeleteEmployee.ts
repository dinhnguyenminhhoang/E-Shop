// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { adminDeleteEmployee } from "@/app/action/adminAction/adminEmployees";

const AdminDeleteEmployee = createSlice({
    name: "delete-employee-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminDeleteEmployee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminDeleteEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(adminDeleteEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminDeleteEmployee.reducer;
