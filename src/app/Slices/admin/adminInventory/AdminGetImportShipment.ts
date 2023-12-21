// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { adminGetImportShipment } from "@/app/action/adminAction/adminInventory";

const AdminGetImportShipment = createSlice({
    name: "get-imports-shipment",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminGetImportShipment.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminGetImportShipment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(adminGetImportShipment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetImportShipment.reducer;
