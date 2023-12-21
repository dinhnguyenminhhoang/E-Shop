import { defautlParametersGet, supplierType } from "@/common/getAllType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as adminSupplierApi from "../../../Server/adminSupplierApi";
export const createSupplier = createAsyncThunk(
    "createSupplier/createSupplier",
    async (formData: supplierType) => {
        try {
            const response = await adminSupplierApi.handleCreateSupplier(
                formData
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const getListSupplier = createAsyncThunk(
    "getListSupplier/getListSupplier",
    async (formData: defautlParametersGet) => {
        try {
            const response = await adminSupplierApi.handleGetAllSuppliers(
                formData
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const getSupplier = createAsyncThunk(
    "getSupplier/getSupplier",
    async (id: number) => {
        try {
            const response = await adminSupplierApi.handleGetSupplier(id);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const updateSupplier = createAsyncThunk(
    "updateSupplier/updateSupplier",
    async (formData: supplierType) => {
        try {
            const response = await adminSupplierApi.handleUpdateSupplier(
                formData
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const deleteSupplier = createAsyncThunk(
    "deleteSupplier/deleteSupplier",
    async (id: number) => {
        try {
            const response = await adminSupplierApi.handleDeleteSupplier(id);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
