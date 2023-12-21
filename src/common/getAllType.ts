export interface getProductType {
    Keyword?: string;
    SortedBy?: string;
    pageIndex?: number;
    pageSize?: number;
    Filters?: FiltersType;
}
export interface FiltersType {
    Viewable?: boolean;
    OutOfStock?: boolean;
    CategoryId?: number;
    BrandId?: number;
    NeedId?: number;
    PriceRange?: {
        MinPrice?: number;
        MaxPrice?: number;
    };
}
export interface getEmployeesType {
    Keyword?: string;
    RoleId?: number;
    pageIndex: number;
    pageSize: number;
}
export interface defautlParametersGet {
    pageIndex: number;
    pageSize: number;
    name?: string;
}
export interface limitType {
    Limit?: number;
    StartDate?: string;
    EndDate?: string;
}
export interface getOrderType {
    CustomerName?: string;
    Status?: string;
    StartDate?: string;
    EndDate?: string;
    pageIndex: number;
    pageSize: number;
}
export interface supplierType {
    id?: number;
    name: string;
    email: string;
    phoneNumber: string;
    address: {
        specificAddress: string;
        wards: string;
        districts: string;
        province: string;
    };
}
export interface getDisscountType {
    pageIndex: number;
    pageSize: number;
    Expired?: boolean;
    Active?: boolean;
    ProductName?: string;
}
export interface InventoryType {
    id?: number;
    pageIndex: number;
    pageSize: number;
    IsOutOfStock?: boolean;
    Keyword?: string;
}
export interface getReviewType {
    IsReply?: boolean;
    MinScore?: number;
    MaxScore?: number;
    StartDate?: string;
    EndDate?: string;
    pageIndex: number;
    pagesize: number;
}
