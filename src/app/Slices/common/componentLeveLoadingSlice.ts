import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    componentLevelLoading: {
        loading: false,
        id: "",
    },
};

const componentLeveLoadingSlice = createSlice({
    name: "componentLevelLoading",
    initialState,
    reducers: {
        setComponentLevelLoading: (state, action) => {
            state.componentLevelLoading = action.payload;
        },
    },
});

export const { setComponentLevelLoading } = componentLeveLoadingSlice.actions;
export default componentLeveLoadingSlice.reducer;
