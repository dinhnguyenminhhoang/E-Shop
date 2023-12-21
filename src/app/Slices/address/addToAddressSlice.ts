// reducer.js
import { addToAddress } from "@/app/action/address";
import { createSlice } from "@reduxjs/toolkit";

const AddToAddressSlice = createSlice({
    name: "Add-to-address",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addToAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(addToAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
            });
    },
});

export default AddToAddressSlice.reducer;
