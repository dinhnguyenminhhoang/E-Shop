export interface filterType {
    NeedId?: string;
    CategoryId?: string;
    BrandId?: string;
    PriceRange?: { MinPrice?: number; MaxPrice?: number };
    IsOutOfStock?: boolean;
    new?: boolean;
}
export interface filterTypeAdmin {
    NeedId?: number;
    CategoryId?: number;
    BrandId?: number;
    PriceRange?: { MinPrice?: number; MaxPrice?: number };
    IsOutOfStock?: boolean;
    new?: boolean;
    Viewable?: boolean;
    OutOfStock: boolean;
    SortedBy?: string;
    Keyword?: string;
}
