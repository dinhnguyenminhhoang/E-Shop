// reducer.js
import { uploadFile } from "@/app/action/UserAction";
import { createSlice } from "@reduxjs/toolkit";

const UploadSlice = createSlice({
    name: "upload",
    initialState: {
        data: {},
        isLoading: false,
        imgUrl: "",
        error: null as string | null,
    },
    reducers: {
        setImgUrl: (state, action) => {
            state.imgUrl = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadFile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(uploadFile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(uploadFile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null;
            });
    },
});
export const { setImgUrl } = UploadSlice.actions;
export default UploadSlice.reducer;
