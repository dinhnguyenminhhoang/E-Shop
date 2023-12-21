import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    allRoles: [],
};

const adminRole = createSlice({
    name: "adminRole",
    initialState,
    reducers: {
        setRoleAdmin: (state, action) => {
            state.data = action.payload;
        },
        setAllRole: (state, action) => {
            state.allRoles = action.payload;
        },
    },
});

export const { setRoleAdmin, setAllRole } = adminRole.actions;
export default adminRole.reducer;
