import { createAsyncThunk } from "@reduxjs/toolkit";
import * as reviewApi from "../../Server/catalogsApi";
export const getAllNeeds = createAsyncThunk(
    "getAllNeeds/getAllNeeds",
    async () => {
        try {
            const response = await reviewApi.handleGetAllNeeds();
            let products = response.data;
            return products;
        } catch (error) {
            throw error;
        }
    }
);
export const getAllBrands = createAsyncThunk(
    "getAllBrands/getAllBrands",
    async () => {
        try {
            const response = await reviewApi.handleGetAllBrands();
            let products = response.data;
            return products;
        } catch (error) {
            throw error;
        }
    }
);
export const getAllCategories = createAsyncThunk(
    "getAllCategories/getAllCategories",
    async () => {
        try {
            const response = await reviewApi.handleGetAllCategories();
            let products = response.data;
            return products;
        } catch (error) {
            throw error;
        }
    }
);
