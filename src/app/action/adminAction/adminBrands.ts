import { defautlParametersGet } from "@/common/getAllType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as adminBrandApi from "../../../Server/adminBrand";
export const getBrandsByParams = createAsyncThunk(
    "getBrandsByParams/getBrandsByParams",
    async (formData: defautlParametersGet) => {
        try {
            const response = await adminBrandApi.handleGetBrandsByParam(
                formData
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminCreateBrand = createAsyncThunk(
    "adminCreateBrand/adminCreateBrand",
    async (formData: { name: string; description: string }) => {
        try {
            const response = await adminBrandApi.handleCreateBrand(formData);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminDeleteBrands = createAsyncThunk(
    "adminDeleteBrands/adminDeleteBrands",
    async (id: number) => {
        try {
            const response = await adminBrandApi.handleDeleteBrand(id);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminEditBrands = createAsyncThunk(
    "adminEditBrands/adminEditBrands",
    async (formData: { name: string; description: string; id: number }) => {
        try {
            const response = await adminBrandApi.handleUpdateBrand(formData);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
