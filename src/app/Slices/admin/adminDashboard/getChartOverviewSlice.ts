// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getChartOverview } from "@/app/action/adminAction/adminDashboard";

const getOverviewSlice = createSlice({
    name: "get-chart-overview",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getChartOverview.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getChartOverview.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getChartOverview.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default getOverviewSlice.reducer;
