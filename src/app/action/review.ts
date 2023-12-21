import { createAsyncThunk } from "@reduxjs/toolkit";
import * as reviewApi from "../../Server/reviewApi";
import { commentType } from "@/common/review";
export const getAllReview = createAsyncThunk(
    "getAllReview/getAllReview",
    async (id: number) => {
        try {
            const response = await reviewApi.handlegetAllReview(id);
            let reviews = response.data;
            return reviews;
        } catch (error) {
            throw error;
        }
    }
);
export const createReview = createAsyncThunk(
    "createReview/createReview",
    async (formData: commentType) => {
        try {
            const response = await reviewApi.handleCreateReview(formData);
            return response;
        } catch (error) {
            throw error;
        }
    }
);
