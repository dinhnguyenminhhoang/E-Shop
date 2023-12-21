import { defautlParametersGet } from "@/common/getAllType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as adminCategoriesApi from "../../../Server/adminCategories";
export const getCategoriesByParams = createAsyncThunk(
    "getCategoriesByParams/getCategoriesByParams",
    async (formData: defautlParametersGet) => {
        try {
            const response =
                await adminCategoriesApi.handleGetCategoriesByParam(formData);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminCreateCategory = createAsyncThunk(
    "adminCreateCategory/adminCreateCategory",
    async (formData: { name: string; description: string }) => {
        try {
            const response = await adminCategoriesApi.handleCreateCategory(
                formData
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminDeleteCategory = createAsyncThunk(
    "adminDeleteCategory/adminDeleteCategory",
    async (id: number) => {
        try {
            const response = await adminCategoriesApi.handleDeleteCategory(id);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminEditCategory = createAsyncThunk(
    "adminEditCategory/adminEditCategory",
    async (formData: { name: string; description: string; id: number }) => {
        try {
            const response = await adminCategoriesApi.handleUpdateCategory(
                formData
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
