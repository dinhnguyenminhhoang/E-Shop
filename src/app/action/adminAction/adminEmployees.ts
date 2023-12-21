import { UserType } from "@/common";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as adminEmployeesApi from "../../../Server/adminEmployeesApi";
import { getEmployeesType } from "@/common/getAllType";
import { employeeType } from "@/common/employee";
export const AdminLogin = createAsyncThunk(
    "AdminLogin/AdminLogin",
    async (formData: UserType.userLoginType) => {
        try {
            const response = await adminEmployeesApi.handleLoginAdmin(formData);
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const AdminLogout = createAsyncThunk(
    "AdminLogout/AdminLogout",
    async (refreshToken: string) => {
        try {
            const response = await adminEmployeesApi.handleLogoutAdmin(
                refreshToken
            );
            let data = response;
            return data;
        } catch (error) {
            throw error;
        }
    }
);
export const adminAllEmployees = createAsyncThunk(
    "adminAllEmployees/adminAllEmployees",
    async (formData: getEmployeesType) => {
        try {
            const response = await adminEmployeesApi.handleGetAllEmployees(
                formData
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
);
export const adminGetEmployeeById = createAsyncThunk(
    "adminGetEmployeeById/adminGetEmployeeById",
    async (id: number) => {
        try {
            const response = await adminEmployeesApi.handleGetEmployee(id);
            return response;
        } catch (error) {
            throw error;
        }
    }
);
export const adminCreateEmployee = createAsyncThunk(
    "adminCreateEmployee/adminCreateEmployee",
    async (formData: employeeType) => {
        try {
            const response = await adminEmployeesApi.handleCreateEmployee(
                formData
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
);
export const adminUpdateEmployee = createAsyncThunk(
    "adminUpdateEmployee/adminUpdateEmployee",
    async (formData: employeeType) => {
        try {
            const response = await adminEmployeesApi.handleUpdateEmployee(
                formData
            );
            return response;
        } catch (error) {
            throw error;
        }
    }
);
export const adminDeleteEmployee = createAsyncThunk(
    "adminDeleteEmployee/adminDeleteEmployee",
    async (id: number) => {
        try {
            const response = await adminEmployeesApi.handleDeleteEmployee(id);
            return response;
        } catch (error) {
            throw error;
        }
    }
);
