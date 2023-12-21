export interface productVersion {
    id: number | string;
    imageUrl: string;
    color: string;
    isOutOfStock: boolean;
    name: string;
    originPrice: string;
    price: string;
    specifications?: specificationsType;
    inventory?: number;
}

export interface ProductType {
    id: number | string;
    imageUrl: string;
    name: string;
    price: string | number;
    originPrice: string | number;
    discountPercent: string | number;
    description?: string;
    reviewsScore: number;
    isOutOfStock: boolean;
    catalogs: {
        categoryId: string | number;
    };
    productVersions?: productVersion[];
}
export interface productCreateOptionsType {
    name: string;
    description: string;
    imageUrl: string;
    warranty: string;
    categoryId: number;
    brandId: number;
    needId: number;
}
export interface cretaeProductVersionType {
    productVersionId?: number;
    productId: number;
    name: string;
    imageUrl: string;
    color: string;
    price: number;
    specifications: specificationsType;
}
export interface specificationsType {
    os?: string;
    cpu?: string;
    gpu?: string;
    ram?: string;
    storage?: string;
    display?: string;
    webcam?: string;
    connectivityPorts?: string;
    wirelessConnectivity?: string;
    weight?: string;
    battery?: string;
    releaseYear?: number;
    rearCamera?: string;
    frontCamera?: string;
    batteryCapacity?: string;
}
export interface paramsProductType {
    Keyword?: string;
    pageIndex?: string;
    pageSize?: string;
    SortedBy?: string;
    Filters?: {
        IsOutOfStock?: boolean;
        BrandId?: string | number;
        NeedId?: string | number;
        CategoryId?: string | number;
        PriceRange?: {
            MinPrice?: number;
            MaxPrice?: number;
        };
    };
}
export interface productSeling {
    id: number;
    imageUrl: string;
    inventoryDto: number;
    name: string;
    price: number;
    rating: number;
    rattingAmount: number;
    totalQuantitySold: number;
}
