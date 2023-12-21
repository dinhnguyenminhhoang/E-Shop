// reducer.js
import { resetPassword } from "@/app/action/UserAction";
import { createSlice } from "@reduxjs/toolkit";

const registerSlice = createSlice({
    name: "register",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(resetPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(resetPassword.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
            });
    },
});

export default registerSlice.reducer;
