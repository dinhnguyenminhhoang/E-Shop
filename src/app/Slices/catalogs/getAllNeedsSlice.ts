// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getAllNeeds } from "@/app/action/catalogs";

const getAllNeedsSlice = createSlice({
    name: "get-all-needs",
    initialState: {
        data: [],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllNeeds.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllNeeds.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getAllNeeds.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default getAllNeedsSlice.reducer;
