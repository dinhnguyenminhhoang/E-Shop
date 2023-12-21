import { createAsyncThunk } from "@reduxjs/toolkit";
import * as productApi from "../../Server/ProductApi";
import { paramsProductType } from "../../common/product";
export const getAllProduct = createAsyncThunk(
    "getAllProduct/getAllProduct",
    async (data: paramsProductType) => {
        try {
            const response = await productApi.handleGetAllProduct(data);
            let products = response.data; // Gửi yêu cầu API
            return products;
        } catch (error) {
            throw error;
        }
    }
);
export const getLaptopProduct = createAsyncThunk(
    "getLaptopProduct/getLaptopProduct",
    async (data: paramsProductType) => {
        try {
            const response = await productApi.handleGetLaptopProduct(data);
            let products = response.data; // Gửi yêu cầu API
            return products;
        } catch (error) {
            throw error;
        }
    }
);
export const getMobileProduct = createAsyncThunk(
    "getMobileProduct/getMobileProduct",
    async (data: paramsProductType) => {
        try {
            const response = await productApi.handleGetMobileProduct(data);
            let products = response.data; // Gửi yêu cầu API
            return products;
        } catch (error) {
            throw error;
        }
    }
);
export const getProductById = createAsyncThunk(
    "getProductById/getProductById",
    async (id: string | number) => {
        try {
            const response = await productApi.handleGetProductById(id);
            let products = response.data;
            return products;
        } catch (error) {
            throw error;
        }
    }
);
export const searchProduct = createAsyncThunk(
    "searchProduct/searchProduct",
    async (keyword: string) => {
        try {
            const response = await productApi.handleSearchProduct(keyword);
            let products = response.data;
            return products;
        } catch (error) {
            throw error;
        }
    }
);
