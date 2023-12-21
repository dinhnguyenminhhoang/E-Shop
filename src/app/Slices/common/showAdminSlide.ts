// showAdminSlide.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAdminSlide: true,
};

const showAdminSlide = createSlice({
  name: 'showAdminSlide',
  initialState,
  reducers: {
    setshowAdminSlide: (state, action) => {
      state.showAdminSlide = action.payload;
    },
  },
});

export const { setshowAdminSlide } = showAdminSlide.actions;
export default showAdminSlide.reducer;
