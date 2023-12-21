export interface reviewType {
    id: number;
    content: string;
    score: number;
    productVersionName: string;
    productVersionImgUrl: string;
    fullname: string;
    avatarUrl: string;
    createdAt: string;
}
export interface relyType {
    id: number;
    content: string;
    fullname: string;
    avatarUrl: string;
    createdAt: string;
    updatedAt: string;
}
export interface reviewRelyType {
    id: number;
    content: string;
    score: number;
    productVersionName: string;
    productVersionImgUrl: string;
    fullname: string;
    avatarUrl: string;
    createdAt: string;
    reply?: relyType;
}
export interface allReviewType {
    totalReview: number;
    averaegScore: number;
    reviews: reviewUserType[];
}
export interface reviewUserType {
    reply: {
        id: number;
        content: string;
        fullname: string;
        avatarUrl: string;
        createdAt: string;
        updatedAt: string;
    };
    id: number;
    content: string;
    score: number;
    productVersionName: string;
    productVersionImgUrl: string;
    fullname: string;
    avatarUrl: string;
    createdAt: string;
}
