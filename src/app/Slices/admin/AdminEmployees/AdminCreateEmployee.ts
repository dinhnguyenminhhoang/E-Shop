// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { adminCreateEmployee } from "@/app/action/adminAction/adminEmployees";

const AdminCreateEmployee = createSlice({
    name: "cretate-employee-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminCreateEmployee.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminCreateEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(adminCreateEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminCreateEmployee.reducer;
