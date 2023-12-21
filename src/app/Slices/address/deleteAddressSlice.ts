// reducer.js
import { deleteAddress } from "@/app/action/address";
import { createSlice } from "@reduxjs/toolkit";

const deleteAddressSlice = createSlice({
    name: "delete-address",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(deleteAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
            });
    },
});

export default deleteAddressSlice.reducer;
