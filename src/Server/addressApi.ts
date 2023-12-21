import { addressType } from "@/common/Address";
import axios from "../utils/instance";
import Cookies from "js-cookie";
const handleAddAddress = (formData: addressType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.post(`/api/customer/addresses`, formData, { headers });
};
const handleUpdateAddress = (formData: addressType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.patch(`/api/customer/addresses/${formData.id}`, formData, {
        headers,
    });
};
const handleUpdateDefaultAddress = (formData: {
    id: number;
    isDefault: boolean;
}) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.patch(`/api/customer/addresses/${formData.id}`, formData, {
        headers,
    });
};
const handleGetAllAddresses = () => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.get(`/api/customer/addresses`, { headers });
};
const handleDeleteAddresses = (id: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.delete(`/api/customer/addresses/${id}`, { headers });
};
export {
    handleAddAddress,
    handleGetAllAddresses,
    handleDeleteAddresses,
    handleUpdateAddress,
    handleUpdateDefaultAddress,
};
