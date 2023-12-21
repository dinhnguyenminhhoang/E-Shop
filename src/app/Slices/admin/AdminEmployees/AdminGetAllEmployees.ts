// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { adminAllEmployees } from "@/app/action/adminAction/adminEmployees";

const AdminGetAllEmployees = createSlice({
    name: "get-all-employees-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminAllEmployees.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminAllEmployees.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(adminAllEmployees.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetAllEmployees.reducer;
