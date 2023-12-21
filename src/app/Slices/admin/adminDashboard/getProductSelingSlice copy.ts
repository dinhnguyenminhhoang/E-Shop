// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getParameters } from "@/app/action/adminAction/adminDashboard";

const AdminGetParametersSlice = createSlice({
    name: "get-get-parameters",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getParameters.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getParameters.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getParameters.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminGetParametersSlice.reducer;
