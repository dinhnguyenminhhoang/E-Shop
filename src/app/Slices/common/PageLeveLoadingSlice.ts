// pageLevelLoadingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pageLevelLoading: false,
};

const pageLevelLoadingSlice = createSlice({
  name: 'pageLevelLoading',
  initialState,
  reducers: {
    setPageLevelLoading: (state, action) => {
      state.pageLevelLoading = action.payload;
    },
  },
});

export const { setPageLevelLoading } = pageLevelLoadingSlice.actions;
export default pageLevelLoadingSlice.reducer;
