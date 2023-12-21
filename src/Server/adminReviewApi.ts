import { getReviewType } from "@/common/getAllType";
import Cookies from "js-cookie";
import axios from "../utils/instance";

const handleGetListReviews = (formData: getReviewType) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const {
        pageIndex,
        pagesize,
        EndDate,
        IsReply,
        MaxScore,
        MinScore,
        StartDate,
    } = formData;
    const queryParams: any = {};

    if (pageIndex !== undefined) queryParams.pageIndex = pageIndex;
    if (pagesize !== undefined) queryParams.pagesize = pagesize;
    if (IsReply !== undefined) queryParams.IsReply = IsReply;
    if (EndDate) queryParams.EndDate = EndDate;
    if (StartDate) queryParams.StartDate = StartDate;
    if (MaxScore !== undefined) queryParams.MaxScore = MaxScore;
    if (MinScore !== undefined) queryParams.MinScore = MinScore;

    return axios.get("/api/reviews", {
        headers,
        params: queryParams,
    });
};
const handleGetDetailReview = (reviewId: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.get(`/api/reviews/${reviewId}/detail`, { headers });
};
const handleCreateReviewReply = (formData: {
    reviewId: number;
    content: string;
}) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { content, reviewId } = formData;
    return axios.post(
        `/api/reviews/${reviewId}/reply`,
        { content },
        { headers }
    );
};
const handleEditReply = (formData: { reviewId: number; content: string }) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    const { content, reviewId } = formData;
    return axios.patch(
        `/api/reviews/${reviewId}/reply`,
        { content },
        { headers }
    );
};
const handleDeleteReply = (reviewId: number) => {
    const headers = {
        Authorization: `Bearer ${Cookies.get("AdminToken")}`,
    };
    return axios.delete(`/api/reviews/${reviewId}/reply`, { headers });
};
export {
    handleGetListReviews,
    handleGetDetailReview,
    handleCreateReviewReply,
    handleEditReply,
    handleDeleteReply,
};
