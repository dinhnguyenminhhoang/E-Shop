// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getListRoles } from "@/app/action/adminAction/adminRoles";

const AdminGetListRolesSlice = createSlice({
    name: "get-list-roles",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListRoles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getListRoles.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getListRoles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetListRolesSlice.reducer;
