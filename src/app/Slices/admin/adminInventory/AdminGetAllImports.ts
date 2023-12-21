// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { adminAllImports } from "@/app/action/adminAction/adminInventory";

const AdminGetAllImports = createSlice({
    name: "get-all-imports-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminAllImports.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminAllImports.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(adminAllImports.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetAllImports.reducer;
