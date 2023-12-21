// reducer.js
import { getAllOrder } from "@/app/action/Order";
import { orderType } from "@/common/Order";
import { createSlice } from "@reduxjs/toolkit";

const GetAllCartSlice = createSlice({
    name: "get-all-Order",
    initialState: {
        data: [] as orderType[],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrder.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getAllOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default GetAllCartSlice.reducer;
