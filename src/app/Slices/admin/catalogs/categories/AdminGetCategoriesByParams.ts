// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getCategoriesByParams } from "@/app/action/adminAction/adminCategories";

const AdminGetCategoriesByParams = createSlice({
    name: "get-categories-param-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategoriesByParams.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCategoriesByParams.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getCategoriesByParams.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetCategoriesByParams.reducer;
