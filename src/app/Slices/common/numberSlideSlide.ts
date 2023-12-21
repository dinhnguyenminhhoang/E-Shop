// numberSlideSlide.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    numberSlideData: 0,
};

const numberSlideSlide = createSlice({
    name: "numberSlideSlide",
    initialState,
    reducers: {
        setnumberSlideSlide: (state, action) => {
            state.numberSlideData = action.payload;
        },
    },
});

export const { setnumberSlideSlide } = numberSlideSlide.actions;
export default numberSlideSlide.reducer;
