import { getDisscountType } from "@/common/getAllType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as adminDiscount from "../../../Server/adminDiscount";
import { discounttype } from "@/common/discount";
export const getAllDiscount = createAsyncThunk(
    "getAllDiscount/getAllDiscount",
    async (formData: getDisscountType) => {
        try {
            const response = await adminDiscount.handleGetAllDiscounts(
                formData
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminCreateDiscount = createAsyncThunk(
    "adminCreateDiscount/adminCreateDiscount",
    async (formData: discounttype) => {
        try {
            const response = await adminDiscount.handleCreateDiscount(formData);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminUpdateDiscount = createAsyncThunk(
    "adminUpdateDiscount/adminUpdateDiscount",
    async (formData: discounttype) => {
        try {
            const response = await adminDiscount.handleUpdateDiscount(formData);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminDeleteDiscount = createAsyncThunk(
    "adminDeleteDiscount/adminDeleteDiscount",
    async (id: number) => {
        try {
            const response = await adminDiscount.handleDeleteDiscount(id);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
