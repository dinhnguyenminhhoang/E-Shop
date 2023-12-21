export interface employeeType {
    id?: number;
    firstName: string;
    lastName: string;
    gender: boolean;
    dayOfBirth: string;
    email: string;
    phoneNumber: string;
    password: string;
    avatarUrl: string;
    active: boolean;
    address?: emlpoyeeAddress;
    roleId: number;
}
export interface emlpoyeeAddress {
    specificAddress: string;
    wards: string;
    districts: string;
    province: string;
}
export interface employeeGetType {
    id: number;
    firstName: string;
    lastName: string;
    gender: boolean;
    email: string;
    phoneNumber: string;
    avatarUrl: string;
    active: boolean;
    roleId: number;
    updatedAt: string;
    createdAt: string;
}
export interface employeeSeling {
    id: number;
    name: string;
    gender: boolean;
    avatarUrl: string;
    totalOrderSold: number;
    totalValueSold: number;
}
