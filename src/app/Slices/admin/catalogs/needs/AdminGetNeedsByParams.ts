// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getNeedsByParams } from "@/app/action/adminAction/adminNeeds";

const AdminGetNeedsByParams = createSlice({
    name: "get-needs-param-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNeedsByParams.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getNeedsByParams.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getNeedsByParams.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetNeedsByParams.reducer;
