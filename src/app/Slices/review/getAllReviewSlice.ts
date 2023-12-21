// reducer.js
import { getAllReview } from "@/app/action/review";
import { createSlice } from "@reduxjs/toolkit";

const getAllReviewSlice = createSlice({
    name: "get-all-review",
    initialState: {
        data: [],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getAllReview.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default getAllReviewSlice.reducer;
