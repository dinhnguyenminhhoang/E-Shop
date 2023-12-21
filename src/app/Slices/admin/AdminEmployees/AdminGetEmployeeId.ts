// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { adminGetEmployeeById } from "@/app/action/adminAction/adminEmployees";

const AdminGetEmployeeId = createSlice({
    name: "get-employee-id-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminGetEmployeeById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminGetEmployeeById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(adminGetEmployeeById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetEmployeeId.reducer;
