// modalSlice.js
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    showModal: false,
  },
  reducers: {
    openModal: (state) => {
      state.showModal = true;
      console.log("on")
    },
    closeModal: (state) => {
      state.showModal = false;
      console.log("off")
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectShowModal = (state:any) => state.modal.showModal;

export default modalSlice.reducer;
