import { getOrderType } from "@/common/getAllType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as adminOrderApi from "../../../Server/adminOrderApi";
export const adminListOrder = createAsyncThunk(
    "adminListOrder/adminListOrder",
    async (formData: getOrderType) => {
        try {
            const response = await adminOrderApi.handleGetListOrder(formData);
            return response;
        } catch (error) {
            throw error;
        }
    }
);
export const adminUpdateOrderDetail = createAsyncThunk(
    "adminUpdateOrderDetail/adminUpdateOrderDetail",
    async (formData: { orderDetailId: number; importShipmentId: number }) => {
        try {
            const response = await adminOrderApi.handleUpdateOrderDetail(
                formData
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
);
export const adminGetOrderDetail = createAsyncThunk(
    "adminGetOrderDetail/adminGetOrderDetail",
    async (id: number) => {
        try {
            const response = await adminOrderApi.handleGetOrderDetail(id);
            return response;
        } catch (error) {
            throw error;
        }
    }
);
export const adminUpdateStatus = createAsyncThunk(
    "adminUpdateStatus/adminUpdateStatus",
    async (formData: { orderId: number; status: string }) => {
        try {
            const response = await adminOrderApi.handleUpdateStatus(formData);
            return response;
        } catch (error) {
            throw error;
        }
    }
);
