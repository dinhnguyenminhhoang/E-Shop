import Cookies from "js-cookie";
import axios from "../utils/instance";
import { checkoutProductType, productItemType } from "@/common/Cart";

const handleCheckOutWidthCart = (formData: {
    cartItemsIds: number[];
    shippingAddressesId?: number;
}) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.post(`/api/checkout/cart`, formData, { headers });
};
const handleCheckOutWidthProduct = (formData: checkoutProductType) => {
    return axios.post(`/api/checkout/product`, formData);
};
const handleCheckoutWidthproductWithAuthentication = (formData: {
    items: productItemType[];
    shippingAddressesId?: number;
}) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.post(`/api/checkout/product-with-authentication`, formData, {
        headers,
    });
};
export {
    handleCheckOutWidthCart,
    handleCheckOutWidthProduct,
    handleCheckoutWidthproductWithAuthentication,
};
