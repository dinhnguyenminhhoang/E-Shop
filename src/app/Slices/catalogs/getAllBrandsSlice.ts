// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getAllBrands } from "@/app/action/catalogs";

const getAllBrandsSlice = createSlice({
    name: "get-all-brands",
    initialState: {
        data: [],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllBrands.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllBrands.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getAllBrands.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default getAllBrandsSlice.reducer;
