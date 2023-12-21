// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getAllPermissions } from "@/app/action/adminAction/adminRoles";

const AdminGetListPermissionsSlice = createSlice({
    name: "get-list-permissions",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPermissions.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllPermissions.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getAllPermissions.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetListPermissionsSlice.reducer;
