// reducer.js
import { addToCart } from "@/app/action/CartActon";
import { createSlice } from "@reduxjs/toolkit";

const AddTocartSlice = createSlice({
    name: "Add-to-cart",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
            });
    },
});

export default AddTocartSlice.reducer;
