import axios from "../utils/instance";
import Cookies from "js-cookie";

const handleGetAllOrder = (status?: string) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    if (status !== "") {
        return axios.get(`/api/orders?status=${status}`, { headers });
    } else return axios.get(`/api/orders`, { headers });
};
const handleCancelOrder = (orderId: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.post(`/api/orders/cancel/${orderId}`, null, {
        headers: headers,
    });
};
export { handleGetAllOrder, handleCancelOrder };
