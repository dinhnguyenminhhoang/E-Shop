import { paramsProductType } from "@/common/product";
import axios from "../utils/instance";
const handleGetAllProduct = (param: paramsProductType) => {
    let { Filters, Keyword, SortedBy, pageIndex, pageSize } = param;
    const queryParams: any = {};

    if (Keyword) queryParams.Keyword = Keyword;
    if (SortedBy) queryParams.SortedBy = SortedBy;
    if (pageIndex !== undefined) queryParams.pageIndex = pageIndex;
    if (pageSize !== undefined) queryParams.pageSize = pageSize;
    if (Filters) {
        const { CategoryId, BrandId, NeedId, PriceRange, IsOutOfStock } =
            Filters;

        if (IsOutOfStock) queryParams["Filters.IsOutOfStock"] = IsOutOfStock;
        if (CategoryId !== undefined)
            queryParams["Filters.CategoryId"] = CategoryId;
        if (BrandId !== undefined) queryParams["Filters.BrandId"] = BrandId;
        if (NeedId !== undefined) queryParams["Filters.NeedId"] = NeedId;

        if (PriceRange) {
            if (Number(PriceRange.MinPrice) > 0)
                queryParams["Filters.PriceRange.MinPrice"] =
                    PriceRange.MinPrice;
            if (Number(PriceRange.MaxPrice) > 0)
                queryParams["Filters.PriceRange.MaxPrice"] =
                    PriceRange.MaxPrice;
        }
    }
    return axios.get(`/api/products`, {
        params: queryParams,
    });
};
const handleGetLaptopProduct = (param: paramsProductType) => {
    let { pageIndex, pageSize } = param;
    if (!pageIndex) pageIndex = "1";
    if (!pageSize) pageSize = "10";
    return axios.get(
        `/api/products?pageSize=${pageSize}?pageIndex=${pageIndex}&Filters.CategoryId=3&SortedBy=new`
    );
};
const handleGetMobileProduct = (param: paramsProductType) => {
    let { pageIndex, pageSize } = param;
    if (!pageIndex) pageIndex = "1";
    if (!pageSize) pageSize = "10";
    return axios.get(
        `/api/products?pageSize=${pageSize}?pageIndex=${pageIndex}&Filters.CategoryId=2&SortedBy=new`
    );
};
const handleSearchProduct = (Keyword: string) => {
    const pageIndex = "1";
    const pageSize = "10";
    return axios.get(
        `/api/products?pageSize=${pageSize}?pageIndex=${pageIndex}&Keyword=${Keyword}`
    );
};
const handleGetProductById = (id: string | number) => {
    return axios.get(`/api/products/${id}`);
};
export {
    handleGetAllProduct,
    handleGetProductById,
    handleGetLaptopProduct,
    handleGetMobileProduct,
    handleSearchProduct,
};
