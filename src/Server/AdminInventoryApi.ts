import { supplierType } from "@/common/suppelier";
import Cookies from "js-cookie";
import axios from "../utils/instance";
import { InventoryType } from "@/common/getAllType";
import { importShipmentsType } from "@/common/Inventory";

const handleGetAllInventory = (formParam: InventoryType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { pageIndex, pageSize, IsOutOfStock, Keyword } = formParam;
    const queryParams: any = {};
    if (Keyword) queryParams.Keyword = Keyword;
    if (IsOutOfStock) queryParams.IsOutOfStock = IsOutOfStock;
    if (pageIndex !== undefined) queryParams.pageIndex = pageIndex;
    if (pageSize !== undefined) queryParams.pageSize = pageSize;

    return axios.get(`/api/inventory`, {
        headers,
        params: queryParams,
    });
};

const handleGetAllImports = (formParam: {
    pageIndex: number;
    pageSize: number;
}) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { pageIndex, pageSize } = formParam;
    const queryParams: any = {};
    if (pageIndex !== undefined) queryParams.pageIndex = pageIndex;
    if (pageSize !== undefined) queryParams.pageSize = pageSize;

    return axios.get(`/api/inventory/imports`, {
        headers,
        params: queryParams,
    });
};
const handleCreateImport = (formData: importShipmentsType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.post(`/api/inventory/imports`, formData, { headers });
};
const handleGetImportShipment = (productVersionId: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.get(`/api/inventory/import-shipment/${productVersionId}`, {
        headers,
    });
};
export {
    handleGetAllInventory,
    handleGetAllImports,
    handleCreateImport,
    handleGetImportShipment,
};
