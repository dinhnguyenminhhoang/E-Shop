export interface UserRegisterType {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: String;
    password: string;
}
export interface userLoginType {
    email: string;
    password: string;
}
export interface UserType {
    id: string;
    cookie: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
}
export interface profileType {
    id?: number;
    firstName: string;
    lastName: string;
    gender: boolean;
    dayOfBirth: string;
    email: string;
    phoneNumber: string;
    avatarUrl: string;
    password?: string;
}
export interface AuthState {
    isLoggedIn: boolean;
    data: { accessTokenExpiredIn: string; accessToken: string };
    loading: boolean;
    error: string | null;
}
