// pathSlice.js
import { createSlice } from '@reduxjs/toolkit';

const pathSlice = createSlice({
  name: 'path',
  initialState: [],
  reducers: {
    setPathArray: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPathArray } = pathSlice.actions;
export default pathSlice.reducer;
