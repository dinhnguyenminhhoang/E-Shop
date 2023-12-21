// reducer.js
import { CheckOutWidthCart } from "@/app/action/checkout";
import { createSlice } from "@reduxjs/toolkit";

const checkoutWithCartSlice = createSlice({
    name: "checkout-wit-cart",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(CheckOutWidthCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(CheckOutWidthCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(CheckOutWidthCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
            });
    },
});

export default checkoutWithCartSlice.reducer;
