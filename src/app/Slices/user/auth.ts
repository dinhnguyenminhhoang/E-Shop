import { createSlice } from "@reduxjs/toolkit";
import { login, logout } from "@/app/action/UserAction";
import { UserType } from "@/common";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false,
        data: {},
        loading: false,
        error: "",
    },
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = "";
            })
            .addCase(logout, (state) => {
                // Thêm action cho logout
                state.isLoggedIn = false;
                state.loading = false;
                state.error = "";
            });
    },
});
export const { setIsLoggedIn } = authSlice.actions;
export default authSlice.reducer;
