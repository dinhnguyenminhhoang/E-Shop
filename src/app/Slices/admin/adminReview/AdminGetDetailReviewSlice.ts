// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { adminGetDetailReview } from "@/app/action/adminAction/adminReviews";

const AdminGetDetailReviewSlice = createSlice({
    name: "get-detail-review-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminGetDetailReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminGetDetailReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(adminGetDetailReview.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetDetailReviewSlice.reducer;
