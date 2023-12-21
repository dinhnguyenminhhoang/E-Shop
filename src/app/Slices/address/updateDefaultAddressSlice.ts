// reducer.js
import { updateDefaultAddress } from "@/app/action/address";
import { addressType } from "@/common/Address";
import { createSlice } from "@reduxjs/toolkit";

const updateDefaultAddressSlice = createSlice({
    name: "update-isDefault-to-address",
    initialState: {
        data: [] as addressType[],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(updateDefaultAddress.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateDefaultAddress.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(updateDefaultAddress.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
            });
    },
});

export default updateDefaultAddressSlice.reducer;
