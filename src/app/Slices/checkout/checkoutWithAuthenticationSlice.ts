// reducer.js
import { checkoutWidthproductWithAuthentication } from "@/app/action/checkout";
import { createSlice } from "@reduxjs/toolkit";

const checkoutWithAuthenticationSlice = createSlice({
    name: "checkout-witt-AuthenticationSlic",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                checkoutWidthproductWithAuthentication.pending,
                (state) => {
                    state.isLoading = true;
                }
            )
            .addCase(
                checkoutWidthproductWithAuthentication.fulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.data = action.payload;
                }
            )
            .addCase(
                checkoutWidthproductWithAuthentication.rejected,
                (state, action) => {
                    state.isLoading = false;
                    state.error = action.error.message || null;
                }
            );
    },
});

export default checkoutWithAuthenticationSlice.reducer;
