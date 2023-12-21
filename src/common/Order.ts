export interface orderType {
    orderId: number;
    orderStatus: string;
    totalAmount: number;
    orderDetails: orderDetailsType[];
    shippingInfo: shippingInfoType;
}
export interface orderDetailsType {
    imageUrl?: string;
    productVersionId: Number;
    productVersionName: string;
    quantity: number;
    price: number;
    originPrice: number;
    totalPrice: number;
}
export interface shippingInfoType {
    recipientName: string;
    phoneNumber: string;
    address: string;
}
export interface orderDetailType {
    id: number;
    imageUrl: string;
    productVersionId: number;
    productVersionName: string;
    quantity: number;
    price: number;
    originPrice: number;
    totalPrice: number;
}
export interface orderRecentType {
    id: number;
    date: string;
    customerName: string;
    customerAvatarUrl: string;
    totalPrice: number;
    status: string;
}
