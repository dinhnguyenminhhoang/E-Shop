// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { adminCreateProductVersion } from "@/app/action/adminAction/adminProduct";

const AdminCreateNewProductVersion = createSlice({
    name: "cretae-new-product-version-admin",
    initialState: {
        data: {},
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminCreateProductVersion.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(adminCreateProductVersion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(adminCreateProductVersion.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
            });
    },
});

export default AdminCreateNewProductVersion.reducer;
