// reducer.js
import { createReview } from "@/app/action/review";
import { createSlice } from "@reduxjs/toolkit";

const createReviewSlice = createSlice({
    name: "create-review",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(createReview.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default createReviewSlice.reducer;
