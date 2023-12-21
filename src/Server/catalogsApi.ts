import { defautlParametersGet } from "@/common/getAllType";
import axios from "../utils/instance";
import Cookies from "js-cookie";
//needs
const handleGetAllNeeds = () => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.get(`/api/needs/all`, { headers });
};
//brands
const handleGetAllBrands = () => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.get(`/api/brands/all`, { headers });
};
//categories
const handleGetAllCategories = () => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.get(`/api/categories/all`, { headers });
};

export { handleGetAllNeeds, handleGetAllBrands, handleGetAllCategories };
