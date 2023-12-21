// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getetChartAmountSoldOfBrands } from "@/app/action/adminAction/adminDashboard";

const getAmountSoldOfBrandsSlice = createSlice({
    name: "get-amount-sold-of-brands",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getetChartAmountSoldOfBrands.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                getetChartAmountSoldOfBrands.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.data = action.payload;
                }
            )
            .addCase(getetChartAmountSoldOfBrands.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default getAmountSoldOfBrandsSlice.reducer;
