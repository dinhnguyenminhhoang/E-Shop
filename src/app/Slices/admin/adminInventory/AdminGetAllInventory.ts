// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { adminGetAllInventory } from "@/app/action/adminAction/adminInventory";

const AdminGetAllInventory = createSlice({
    name: "get-all-inventory-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminGetAllInventory.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminGetAllInventory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(adminGetAllInventory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetAllInventory.reducer;
