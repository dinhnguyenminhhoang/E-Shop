// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getChartRevenueAndProfit } from "@/app/action/adminAction/adminDashboard";

const getrevenueAndProfitSlice = createSlice({
    name: "get-chart-Revenue-And-Profit",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getChartRevenueAndProfit.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getChartRevenueAndProfit.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getChartRevenueAndProfit.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default getrevenueAndProfitSlice.reducer;
