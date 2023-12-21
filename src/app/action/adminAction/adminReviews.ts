import { defautlParametersGet, getReviewType } from "@/common/getAllType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as adminReviewApi from "../../../Server/adminReviewApi";
export const adminGetListReview = createAsyncThunk(
    "adminGetListReview/adminGetListReview",
    async (formData: getReviewType) => {
        try {
            const response = await adminReviewApi.handleGetListReviews(
                formData
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminGetDetailReview = createAsyncThunk(
    "adminGetDetailReview/adminGetDetailReview",
    async (id: number) => {
        try {
            const response = await adminReviewApi.handleGetDetailReview(id);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminCreateReply = createAsyncThunk(
    "adminCreateReply/adminCreateReply",
    async (formData: { reviewId: number; content: string }) => {
        try {
            const response = await adminReviewApi.handleCreateReviewReply(
                formData
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminUpdateRely = createAsyncThunk(
    "adminUpdateRely/adminUpdateRely",
    async (formData: { reviewId: number; content: string }) => {
        try {
            const response = await adminReviewApi.handleEditReply(formData);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminDeleteReply = createAsyncThunk(
    "adminDeleteReply/adminDeleteReply",
    async (id: number) => {
        try {
            const response = await adminReviewApi.handleDeleteReply(id);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
