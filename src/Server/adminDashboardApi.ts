import { limitType } from "@/common/getAllType";
import Cookies from "js-cookie";
import axios from "../utils/instance";

const handleGetBestSellingProduct = (formData: limitType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { Limit, StartDate, EndDate } = formData;
    const queryParams: any = {};
    if (Limit) queryParams.Limit = Limit;
    if (StartDate !== "") queryParams.StartDate = StartDate;
    if (EndDate !== "") queryParams.EndDate = EndDate;

    return axios.get(`/api/dashboard/table/best-selling-products`, {
        headers,
        params: queryParams,
    });
};
const handleGetEmployeeTopSeling = (formData: limitType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { Limit, StartDate, EndDate } = formData;
    const queryParams: any = {};
    if (Limit) queryParams.limit = Limit;
    if (StartDate !== "") queryParams.StartDate = StartDate;
    if (EndDate !== "") queryParams.EndDate = EndDate;

    return axios.get(`/api/dashboard/table/top-selling-employees`, {
        headers,
        params: queryParams,
    });
};
const handleGetRecentOrder = (formData: limitType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { Limit, StartDate, EndDate } = formData;
    const queryParams: any = {};
    if (Limit) queryParams.limit = Limit;
    if (StartDate !== "") queryParams.StartDate = StartDate;
    if (EndDate !== "") queryParams.EndDate = EndDate;

    return axios.get(`/api/dashboard/table/recent-orders`, {
        headers,
        params: queryParams,
    });
};
const handleGetChartOrder = (formData: limitType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { StartDate, EndDate } = formData;
    const queryParams: any = {};
    if (StartDate !== "") queryParams.StartDate = StartDate;
    if (EndDate !== "") queryParams.EndDate = EndDate;

    return axios.get(`/api/dashboard/chart/orders`, {
        headers,
        params: queryParams,
    });
};
const handleGetChartOverview = (formData: limitType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { StartDate, EndDate } = formData;
    const queryParams: any = {};
    if (StartDate !== "") queryParams.StartDate = StartDate;
    if (EndDate !== "") queryParams.EndDate = EndDate;

    return axios.get(`/api/dashboard/chart/overview`, {
        headers,
        params: queryParams,
    });
};
const handleGetChartRevenueAndProfit = (formData: limitType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { StartDate, EndDate } = formData;
    const queryParams: any = {};
    if (StartDate !== "") queryParams.StartDate = StartDate;
    if (EndDate !== "") queryParams.EndDate = EndDate;

    return axios.get(`/api/dashboard/chart/revenue-and-profit`, {
        headers,
        params: queryParams,
    });
};
const handleGetChartAmountSoldOfCategories = (formData: limitType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { StartDate, EndDate, Limit } = formData;
    const queryParams: any = {};
    if (Limit) queryParams.limit = Limit;

    if (StartDate !== "") queryParams.StartDate = StartDate;
    if (EndDate !== "") queryParams.EndDate = EndDate;

    return axios.get(`/api/dashboard/chart/amount-sold-of-category`, {
        headers,
        params: queryParams,
    });
};
const handleGetChartAmountSoldOfBrands = (formData: limitType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { StartDate, EndDate, Limit } = formData;
    const queryParams: any = {};
    if (Limit) queryParams.limit = Limit;

    if (StartDate !== "") queryParams.StartDate = StartDate;
    if (EndDate !== "") queryParams.EndDate = EndDate;

    return axios.get(`/api/dashboard/chart/amount-sold-of-brand`, {
        headers,
        params: queryParams,
    });
};
const handleGetChartAmountSoldOfNeeds = (formData: limitType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { StartDate, EndDate, Limit } = formData;
    const queryParams: any = {};
    if (Limit) queryParams.limit = Limit;

    if (StartDate !== "") queryParams.StartDate = StartDate;
    if (EndDate !== "") queryParams.EndDate = EndDate;

    return axios.get(`/api/dashboard/chart/amount-sold-of-need`, {
        headers,
        params: queryParams,
    });
};
const handleGetParameters = () => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };

    return axios.get(`/api/dashboard/parameters`, {
        headers,
    });
};
export {
    handleGetBestSellingProduct,
    handleGetEmployeeTopSeling,
    handleGetRecentOrder,
    handleGetChartOrder,
    handleGetChartRevenueAndProfit,
    handleGetChartOverview,
    handleGetChartAmountSoldOfNeeds,
    handleGetChartAmountSoldOfBrands,
    handleGetChartAmountSoldOfCategories,
    handleGetParameters,
};
