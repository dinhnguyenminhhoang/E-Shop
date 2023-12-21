import { defautlParametersGet, supplierType } from "@/common/getAllType";
import axios from "../utils/instance";
import Cookies from "js-cookie";

const handleGetAllSuppliers = (formData: defautlParametersGet) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { name, pageIndex, pageSize } = formData;
    const params =
        name?.trim() !== ""
            ? { Keyword: name, pageIndex, pageSize }
            : { pageIndex, pageSize };
    return axios.get(`/api/supplier`, { params, headers });
};
const handleCreateSupplier = (formData: supplierType) => {
    alert("check");
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.post(`/api/supplier`, formData, { headers });
};
const handleGetSupplier = (id: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.get(`/api/supplier/${id}`, { headers });
};
const handleUpdateSupplier = (formData: supplierType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.patch(`/api/supplier/${formData.id}`, formData, { headers });
};
const handleDeleteSupplier = (id: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.delete(`/api/supplier/${id}`, { headers });
};

export {
    handleCreateSupplier,
    handleDeleteSupplier,
    handleGetAllSuppliers,
    handleGetSupplier,
    handleUpdateSupplier,
};
