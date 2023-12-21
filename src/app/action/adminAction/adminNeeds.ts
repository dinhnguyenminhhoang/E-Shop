import { defautlParametersGet } from "@/common/getAllType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as adminNeedApi from "../../../Server/adminNeedApi";
export const getNeedsByParams = createAsyncThunk(
    "getNeedsByParams/getNeedsByParams",
    async (formData: defautlParametersGet) => {
        try {
            const response = await adminNeedApi.handleGetNeedsByParam(formData);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminCreateNeed = createAsyncThunk(
    "adminCreateNeed/adminCreateNeed",
    async (formData: { title: string; description: string }) => {
        try {
            const response = await adminNeedApi.handleCreateNeed(formData);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminDeleteNeed = createAsyncThunk(
    "adminDeleteNeed/adminDeleteNeed",
    async (id: number) => {
        try {
            const response = await adminNeedApi.handleDeleteNeed(id);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminEditNeed = createAsyncThunk(
    "adminEditNeed/adminEditNeed",
    async (formData: { title: string; description: string; id: number }) => {
        try {
            const response = await adminNeedApi.handleUpdateNeed(formData);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
