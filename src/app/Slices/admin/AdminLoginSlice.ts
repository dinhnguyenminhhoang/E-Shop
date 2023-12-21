import { createSlice } from "@reduxjs/toolkit";
import { AdminLogin } from "@/app/action/adminAction/adminEmployees";

const initialState = {
    isLoggedInAdmin: false,
    data: {} as any,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "authAdmin",
    initialState,
    reducers: {
        setIsLoggedInAdmin: (state, action) => {
            state.isLoggedInAdmin = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(AdminLogin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(AdminLogin.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(AdminLogin.rejected, (state, action) => {
                state.loading = false;
            });
    },
});
export const { setIsLoggedInAdmin } = authSlice.actions;
export default authSlice.reducer;
