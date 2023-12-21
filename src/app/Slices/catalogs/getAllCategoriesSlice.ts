// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getAllCategories } from "@/app/action/catalogs";

const getAllCategoriesSlice = createSlice({
    name: "get-all-categories",
    initialState: {
        data: [],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default getAllCategoriesSlice.reducer;
