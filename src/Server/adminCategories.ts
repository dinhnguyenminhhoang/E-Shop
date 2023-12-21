import { defautlParametersGet } from "@/common/getAllType";
import axios from "../utils/instance";
import Cookies from "js-cookie";

const handleCreateCategory = (formData: {
    name: string;
    description: string;
}) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.post(`/api/categories`, formData, { headers });
};
const handleGetCategory = (id: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.get(`/api/categories/${id}`, { headers });
};
const handleUpdateCategory = (formData: {
    name: string;
    description: string;
    id: number;
}) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.patch(`/api/categories/${formData.id}`, formData, { headers });
};
const handleDeleteCategory = (id: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.delete(`/api/categories/${id}`, { headers });
};
const handleGetCategoriesByParam = (formData: defautlParametersGet) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { name, pageIndex, pageSize } = formData;
    const params =
        name?.trim() !== ""
            ? { CategoryName: name, pageIndex, pageSize }
            : { pageIndex, pageSize };
    return axios.get(`/api/categories`, { params, headers });
};
export {
    handleCreateCategory,
    handleGetCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleGetCategoriesByParam,
};
