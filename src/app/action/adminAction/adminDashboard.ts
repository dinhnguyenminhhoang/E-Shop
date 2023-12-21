import { limitType } from "@/common/getAllType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as adminDashboardApi from "../../../Server/adminDashboardApi";
export const getProductSeling = createAsyncThunk(
    "getProductSeling/getProductSeling",
    async (formData: limitType) => {
        try {
            const response =
                await adminDashboardApi.handleGetBestSellingProduct(formData);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const getEmployeesSeling = createAsyncThunk(
    "getEmployeesSeling/getEmployeesSeling",
    async (formData: limitType) => {
        try {
            const response = await adminDashboardApi.handleGetEmployeeTopSeling(
                formData
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const getChartOrder = createAsyncThunk(
    "getChartOrder/getChartOrder",
    async (formData: limitType) => {
        try {
            const response = await adminDashboardApi.handleGetChartOrder(
                formData
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const getChartOverview = createAsyncThunk(
    "getChartOverview/getChartOverview",
    async (formData: limitType) => {
        try {
            const response = await adminDashboardApi.handleGetChartOverview(
                formData
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const getOrderRecent = createAsyncThunk(
    "getOrderRecent/getOrderRecent",
    async (formData: limitType) => {
        try {
            const response = await adminDashboardApi.handleGetRecentOrder(
                formData
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const getChartRevenueAndProfit = createAsyncThunk(
    "getChartRevenueAndProfit/getChartRevenueAndProfit",
    async (formData: limitType) => {
        try {
            const response =
                await adminDashboardApi.handleGetChartRevenueAndProfit(
                    formData
                );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const getetChartAmountSoldOfBrands = createAsyncThunk(
    "getetChartAmountSoldOfBrands/getetChartAmountSoldOfBrands",
    async (formData: limitType) => {
        try {
            const response =
                await adminDashboardApi.handleGetChartAmountSoldOfBrands(
                    formData
                );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const getChartAmountSoldOfCategories = createAsyncThunk(
    "getChartAmountSoldOfCategories/getChartAmountSoldOfCategories",
    async (formData: limitType) => {
        try {
            const response =
                await adminDashboardApi.handleGetChartAmountSoldOfCategories(
                    formData
                );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const getChartAmountSoldOfNeeds = createAsyncThunk(
    "getChartAmountSoldOfNeeds/getChartAmountSoldOfNeeds",
    async (formData: limitType) => {
        try {
            const response =
                await adminDashboardApi.handleGetChartAmountSoldOfNeeds(
                    formData
                );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const getParameters = createAsyncThunk(
    "getParameters/getParameters",
    async () => {
        try {
            const response = await adminDashboardApi.handleGetParameters();
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
