import { InventoryType } from "@/common/getAllType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as AdminInventoryApi from "../../../Server/AdminInventoryApi";
import { importShipmentsType } from "@/common/Inventory";
export const adminGetAllInventory = createAsyncThunk(
    "adminGetAllInventory/adminGetAllInventory",
    async (formParam: InventoryType) => {
        try {
            const response = await AdminInventoryApi.handleGetAllInventory(
                formParam
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminAllImports = createAsyncThunk(
    "adminAllImports/adminAllImports",
    async (formParam: { pageIndex: number; pageSize: number }) => {
        try {
            const response = await AdminInventoryApi.handleGetAllImports(
                formParam
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminCreateImport = createAsyncThunk(
    "adminCreateImport/adminCreateImport",
    async (formData: importShipmentsType) => {
        try {
            const response = await AdminInventoryApi.handleCreateImport(
                formData
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminGetImportShipment = createAsyncThunk(
    "adminGetImportShipment/adminGetImportShipment",
    async (id: number) => {
        try {
            const response = await AdminInventoryApi.handleGetImportShipment(
                id
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
