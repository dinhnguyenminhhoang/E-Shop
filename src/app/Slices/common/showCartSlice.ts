// showCartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showCart: false,
};

const showCartSlice = createSlice({
    name: "showCartSlice",
    initialState,
    reducers: {
        setshowCart: (state, action) => {
            state.showCart = action.payload;
        },
    },
});

export const { setshowCart } = showCartSlice.actions;
export default showCartSlice.reducer;
