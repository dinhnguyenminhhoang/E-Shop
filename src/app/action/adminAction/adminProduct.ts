import { addProductType } from "@/common/adminType/AdminProduct";
import { getProductType } from "@/common/getAllType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as addminProductApi from "../../../Server/addminProductApi";
import { cretaeProductVersionType } from "@/common/product";
export const adminAllProduct = createAsyncThunk(
    "adminAllProduct/adminAllProduct",
    async (formData: getProductType) => {
        try {
            const response = await addminProductApi.handleGetAllProducts(
                formData
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
);
export const adminCreateProduct = createAsyncThunk(
    "adminCreateProduct/adminCreateProduct",
    async (formData: addProductType) => {
        try {
            const response = await addminProductApi.handleCreateProduct(
                formData
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
);
export const adminDeleteProduct = createAsyncThunk(
    "adminDeleteProduct/adminDeleteProduct",
    async (id: number) => {
        try {
            const response = await addminProductApi.handleDeleteProduct(id);
            return response;
        } catch (error) {
            throw error;
        }
    }
);
export const adminUpdateProduct = createAsyncThunk(
    "adminUpdateProduct/adminUpdateProduct",
    async (formData: addProductType) => {
        try {
            const response = await addminProductApi.handleUpdateProduct(
                formData
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
);
export const adminCreateProductVersion = createAsyncThunk(
    "adminCreateProductVersion/adminCreateProductVersion",
    async (formData: cretaeProductVersionType) => {
        try {
            const response =
                await addminProductApi.handleCreateNewProductVersion(formData);
            return response;
        } catch (error) {
            throw error;
        }
    }
);
export const adminDeleteProductVersion = createAsyncThunk(
    "adminDeleteProductVersion/adminDeleteProductVersion",
    async (id: number) => {
        try {
            const response = await addminProductApi.handleDeleteProductVersion(
                id
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
);
export const adminUpadateProductVersion = createAsyncThunk(
    "adminUpadateProductVersion/adminUpadateProductVersion",
    async (allForm: {
        formData: cretaeProductVersionType;
        productVersionId: number;
    }) => {
        try {
            const response = await addminProductApi.handleUpdateProductVersion(
                allForm.formData,
                allForm.productVersionId
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
);
