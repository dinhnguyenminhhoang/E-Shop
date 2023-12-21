// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getBrandsByParams } from "@/app/action/adminAction/adminBrands";

const AdminGetBransByParams = createSlice({
    name: "get-brand-param-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBrandsByParams.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getBrandsByParams.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getBrandsByParams.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetBransByParams.reducer;
