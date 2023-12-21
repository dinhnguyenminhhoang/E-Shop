// reducer.js
import { getProfile } from '@/app/action/UserAction';
import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile-Slice",
    initialState: {
        data: [],
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getProfile.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload; // action.payload phải có kiểu YourDataType[]
        })
        .addCase(getProfile.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
          });
          
        
    },
});

export default profileSlice.reducer;
