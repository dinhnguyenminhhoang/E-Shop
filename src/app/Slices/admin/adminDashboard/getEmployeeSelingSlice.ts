// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getEmployeesSeling } from "@/app/action/adminAction/adminDashboard";

const getEmployeeSelingSlice = createSlice({
    name: "get-list-employees-sealing",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEmployeesSeling.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEmployeesSeling.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getEmployeesSeling.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default getEmployeeSelingSlice.reducer;
