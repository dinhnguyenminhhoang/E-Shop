import { createAsyncThunk } from "@reduxjs/toolkit";
import * as addressApi from "@/Server/addressApi";
import { addressType } from "@/common/Address";

export const addToAddress = createAsyncThunk(
    "addToAddress/addToAddress",
    async (formdata: addressType) => {
        try {
            const response = await addressApi.handleAddAddress(formdata);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const getAllAddresses = createAsyncThunk(
    "getAllAddresses/getAllAddresses",
    async () => {
        try {
            const response = await addressApi.handleGetAllAddresses();
            let data = response.data as addressType[];
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const updateAddress = createAsyncThunk(
    "updateAddress/updateAddress",
    async (formData: addressType) => {
        try {
            const response = await addressApi.handleUpdateAddress(formData);
            let data = response.data as addressType[];
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const updateDefaultAddress = createAsyncThunk(
    "updateDefaultAddress/updateDefaultAddress",
    async (formData: { id: number; isDefault: boolean }) => {
        try {
            const response = await addressApi.handleUpdateDefaultAddress(
                formData
            );
            let data = response.data as addressType[];
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const deleteAddress = createAsyncThunk(
    "deleteAddress/deleteAddress",
    async (id: number) => {
        try {
            const response = await addressApi.handleDeleteAddresses(id);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
