// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getChartOrder } from "@/app/action/adminAction/adminDashboard";

const getChartorderSlice = createSlice({
    name: "get-chart-order",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getChartOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getChartOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getChartOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default getChartorderSlice.reducer;
