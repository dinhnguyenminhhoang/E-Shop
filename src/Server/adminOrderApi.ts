import { getOrderType } from "@/common/getAllType";
import Cookies from "js-cookie";
import axios from "../utils/instance";

const handleGetListOrder = (formData: getOrderType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { pageIndex, pageSize, CustomerName, EndDate, StartDate, Status } =
        formData;
    const queryParams: any = {};
    if (CustomerName) queryParams.CustomerName = CustomerName;
    if (Status) queryParams.Status = Status;
    if (EndDate) queryParams.EndDate = EndDate;
    if (StartDate) queryParams.StartDate = StartDate;
    if (pageIndex !== undefined) queryParams.pageIndex = pageIndex;
    if (pageSize !== undefined) queryParams.pageSize = pageSize;

    return axios.get("/api/orders/list", {
        headers,
        params: queryParams,
    });
};
const handleGetOrderDetail = (orderId: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.get(`/api/orders/${orderId}`, { headers });
};
const handleUpdateStatus = (formData: { orderId: number; status: string }) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { orderId, status } = formData;
    return axios.post(`/api/orders/${orderId}`, { status }, { headers });
};
const handleUpdateOrderDetail = (param: {
    orderDetailId: number;
    importShipmentId: number;
}) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { orderDetailId, importShipmentId } = param;
    return axios.post(
        `/api/orders/order-detail/${orderDetailId}`,
        { importShipmentId },
        {
            headers,
        }
    );
};
export {
    handleGetListOrder,
    handleGetOrderDetail,
    handleUpdateOrderDetail,
    handleUpdateStatus,
};
