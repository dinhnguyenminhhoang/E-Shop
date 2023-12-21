// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getChartAmountSoldOfNeeds } from "@/app/action/adminAction/adminDashboard";

const getAmountNeedSlice = createSlice({
    name: "get-amonut-sold-of-need",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getChartAmountSoldOfNeeds.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getChartAmountSoldOfNeeds.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getChartAmountSoldOfNeeds.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default getAmountNeedSlice.reducer;
