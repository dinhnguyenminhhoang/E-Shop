export interface needType {
    id: number;
    title: string;
    description: string;
    updatedAt: string;
    createdAt: string;
}
export interface brandType {
    id: number;
    name: string;
    description: string;
    updatedAt: string;
    createdAt: string;
}
export interface categoryType {
    id: number;
    name: string;
    description: string;
    updatedAt: string;
    createdAt: string;
}
interface CommonFields {
    name: string;
}

interface CategoryType extends CommonFields {
    otherCategoryField: string;
}

interface NeedType extends CommonFields {
    otherNeedField: string;
}

interface BrandType {
    title: string;
    otherBrandField: string;
}

export type CombinedType = CategoryType | NeedType | BrandType;
