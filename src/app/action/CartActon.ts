import { createAsyncThunk } from "@reduxjs/toolkit";
import * as CartApi from "@/Server/CartApi";
export const addToCart = createAsyncThunk(
    "addToCart/addToCart",
    async (formdata: {
        productVersionId: string | number;
        quantity: number;
    }) => {
        try {
            const response = await CartApi.handleAddToCart(formdata);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const getAllCart = createAsyncThunk(
    "getAllCart/getAllCart",
    async () => {
        try {
            const response = await CartApi.handleAllCart();
            let data = response.data;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const deleteCart = createAsyncThunk(
    "deleteCart/deleteCart",
    async (id: number | string) => {
        try {
            const response = await CartApi.handleDeleteCart(id);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const updateCart = createAsyncThunk(
    "updateCart/updateCart",
    async (formdata: { id: number | string; quantity: number | string }) => {
        try {
            const response = await CartApi.handleUpdateCart(formdata);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
