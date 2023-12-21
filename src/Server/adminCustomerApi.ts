import { defautlParametersGet, getDisscountType } from "@/common/getAllType";
import Cookies from "js-cookie";
import axios from "../utils/instance";
import { profileType } from "@/common/user";

const handleGetListCustomer = (formData: defautlParametersGet) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { pageIndex, pageSize, name } = formData;
    const queryParams: any = {};
    if (name) queryParams.Keyword = name;
    if (pageIndex !== undefined) queryParams.pageIndex = pageIndex;
    if (pageSize !== undefined) queryParams.pageSize = pageSize;

    return axios.get(`/api/customer`, {
        headers,
        params: queryParams,
    });
};
const handleCreateCustomer = (formData: profileType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.post(`/api/customer`, formData, { headers });
};
const handleUpdateCustomer = (formData: profileType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.patch(`/api/customer/${formData.id}`, formData, { headers });
};
const handleDeleteCustomer = (customerId: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.delete(`/api/customer/${customerId}`, { headers });
};
export {
    handleGetListCustomer,
    handleCreateCustomer,
    handleUpdateCustomer,
    handleDeleteCustomer,
};
