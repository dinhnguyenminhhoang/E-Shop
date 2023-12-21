export interface discounttype {
    id?: number;
    productId: number;
    discountPercent: number;
    startDate: string;
    endDate: string;
    quantity: number;
    active: boolean;
}
export interface adminDiscountType {
    active: boolean;
    discountPercent: number;
    endDate: string;
    id: number;
    isExpired: boolean;
    productId: number;
    productName: string;
    quantity: number;
    startDate: string;
}
