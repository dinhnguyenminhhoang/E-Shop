// reducer.js
import { updateAddress } from "@/app/action/address";
import { createSlice } from "@reduxjs/toolkit";

const updateAddressSlice = createSlice({
    name: "update-to-address",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(updateAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
            });
    },
});

export default updateAddressSlice.reducer;
