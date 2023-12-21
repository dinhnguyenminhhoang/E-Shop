// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getChartAmountSoldOfCategories } from "@/app/action/adminAction/adminDashboard";

const getAmountSoldOfCategoriesSlice = createSlice({
    name: "get-amount-sold-of-categories",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getChartAmountSoldOfCategories.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                getChartAmountSoldOfCategories.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.data = action.payload;
                }
            )
            .addCase(
                getChartAmountSoldOfCategories.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
                }
            );
    },
});

export default getAmountSoldOfCategoriesSlice.reducer;
