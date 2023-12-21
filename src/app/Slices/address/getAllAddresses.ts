// reducer.js
import { getAllAddresses } from "@/app/action/address";
import { addressType } from "@/common/Address";
import { createSlice } from "@reduxjs/toolkit";

const addToAddressSlice = createSlice({
    name: "get-all-addresses",
    initialState: {
        data: [] as addressType[],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllAddresses.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getAllAddresses.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getAllAddresses.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
            });
    },
});

export default addToAddressSlice.reducer;
