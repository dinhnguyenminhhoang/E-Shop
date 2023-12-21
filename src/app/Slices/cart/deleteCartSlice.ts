// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { deleteCart } from "@/app/action/CartActon";

const deleteCartSlice = createSlice({
    name: "delete-cart",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(deleteCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
            });
    },
});

export default deleteCartSlice.reducer;
