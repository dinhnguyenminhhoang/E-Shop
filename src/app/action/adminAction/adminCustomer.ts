import { defautlParametersGet } from "@/common/getAllType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as adminCustomerApi from "../../../Server/adminCustomerApi";
import { profileType } from "@/common/user";
export const getListCustomer = createAsyncThunk(
    "getListCustomer/getListCustomer",
    async (formData: defautlParametersGet) => {
        try {
            const response = await adminCustomerApi.handleGetListCustomer(
                formData
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminCreateCustomer = createAsyncThunk(
    "createCustomer/createCustomer",
    async (formData: profileType) => {
        try {
            const response = await adminCustomerApi.handleCreateCustomer(
                formData
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminUpdateCustomer = createAsyncThunk(
    "updateCustomer/updateCustomer",
    async (formData: profileType) => {
        try {
            const response = await adminCustomerApi.handleUpdateCustomer(
                formData
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminDeleteCustomer = createAsyncThunk(
    "deleteCustomer/deleteCustomer",
    async (id: number) => {
        try {
            const response = await adminCustomerApi.handleDeleteCustomer(id);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
