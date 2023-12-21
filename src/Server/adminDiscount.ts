import { discounttype } from "@/common/discount";
import { getDisscountType } from "@/common/getAllType";
import axios from "../utils/instance";
import Cookies from "js-cookie";

const handleGetAllDiscounts = (formData: getDisscountType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { pageIndex, pageSize, Active, Expired, ProductName } = formData;
    const queryParams: any = {};
    if (ProductName) queryParams.ProductName = ProductName;
    if (Active) queryParams.Active = Active;
    if (Expired) queryParams.Expired = Expired;
    if (pageIndex !== undefined) queryParams.pageIndex = pageIndex;
    if (pageSize !== undefined) queryParams.pageSize = pageSize;

    return axios.get(`/api/disscounts`, {
        headers,
        params: queryParams,
    });
};
const handleGetDiscount = (discountId: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.get(`/api/disscounts/${discountId}`, { headers });
};
const handleCreateDiscount = (formData: discounttype) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.post(`/api/disscounts`, formData, { headers });
};
const handleUpdateDiscount = (formData: discounttype) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.patch(`/api/disscounts/${formData.id}`, formData, { headers });
};
const handleDeleteDiscount = (discountId: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.delete(`/api/disscounts/${discountId}`, { headers });
};
export {
    handleGetAllDiscounts,
    handleGetDiscount,
    handleCreateDiscount,
    handleUpdateDiscount,
    handleDeleteDiscount,
};
