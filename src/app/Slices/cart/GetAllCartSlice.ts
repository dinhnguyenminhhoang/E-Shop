// reducer.js
import { createSlice } from "@reduxjs/toolkit";
import { getAllCart } from "@/app/action/CartActon";

const GetAllCartSlice = createSlice({
    name: "get-all-cart",
    initialState: {
        data: [] as any,
        isLoading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getAllCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload; 
        })
        .addCase(getAllCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || null; // Sử dụng || để gán giá trị null nếu action.error.message là undefined
          });
    },
});

export default GetAllCartSlice.reducer;
