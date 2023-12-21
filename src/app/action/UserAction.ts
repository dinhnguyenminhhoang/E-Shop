import { UserType } from "@/common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";
import * as userApi from "../../Server/UserApi";
import { profileType } from "@/common/user";
export const login = createAsyncThunk(
    "login/login",
    async (formData: UserType.userLoginType) => {
        try {
            const response = await userApi.handleLogin(formData);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const registerAction = createAsyncThunk(
    "register/register",
    async (formdata: UserType.UserRegisterType) => {
        try {
            const response = await userApi.handleRegister(formdata);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const resetPassword = createAsyncThunk(
    "resetPassword/resetPassword",
    async (dataReset: {
        email?: string;
        token?: string;
        password?: string;
    }) => {
        try {
            const response = await userApi.handleResetPassword(dataReset);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const logout = createAction("user/logout");
export const getProfile = createAsyncThunk(
    "getProfile/getProfile",
    async () => {
        try {
            const response = await userApi.handleGetProfile();
            let data = response.data;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const uploadFile = createAsyncThunk(
    "uploadFile/uploadFile",
    async (file: any) => {
        try {
            const response = await userApi.handleUploadImg(file);
            let data = response.data;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const updateUserProfile = createAsyncThunk(
    "updateUserProfile/updateUserProfile",
    async (formData: profileType) => {
        try {
            const response = await userApi.handleUpdateUser(formData);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
