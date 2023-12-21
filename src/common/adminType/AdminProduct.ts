export interface AdminProductType {
    id?: number;
    name: string;
    imageUrl: string;
    description: string;
    reviewsScore?: number;
    brandId: number;
    categoryId: number;
    needId?: number;
    viewable?: true;
    warranty?: string;
    createdAt: string;
    updatedAt: string;
}
export interface addProductType {
    id?: number;
    name: string;
    description: string;
    imageUrl: string;
    warranty: string;
    categoryId: number;
    brandId: number;
    needId?: number;
    viewable?: string;
}
