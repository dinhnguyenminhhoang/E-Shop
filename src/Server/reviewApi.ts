import { commentType } from "@/common/review";
import axios from "../utils/instance";
import Cookies from "js-cookie";

const handlegetAllReview = (productId: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.get(`/api/reviews/${productId}`, { headers });
};
const handleCreateReview = (formData: commentType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("token")}`,
    };
    return axios.post(`/api/reviews`, formData, { headers });
};
export { handlegetAllReview, handleCreateReview };
