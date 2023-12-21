// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { adminGetListReview } from "@/app/action/adminAction/adminReviews";

const AdminGetListReviewSlice = createSlice({
    name: "get-list-review-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminGetListReview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminGetListReview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(adminGetListReview.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetListReviewSlice.reducer;
