import { IProductCategory } from "../entities/product-category";

export interface IDefaultResponse<T> {
    message: string;
    data: T;
}

export interface IPaginationResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}

export interface ITokenResponse<T> {
    token: string;
    dispatcher: T;
}

export interface IDispatcherResponse {
    id: number;
    name: string;
    company_name: string;
    email: string;
    mobile: string;
    created_at: string;
    updated_at: string;
}

export interface IUserInfoResponse {
    id: number;
    name: string;
    email: string;
    fantasyName: string;
    active: boolean;
    created_at: string;
    updated_at: string;
    info: string;

}

export interface RootState {
    userApp: IUserApp;
}

export interface IPermission {
    name: string;
}

export interface IUser {
    id: string;
    email: string;
    active: boolean;
    dateCreate: string;
    permission: IPermission;
}

export interface IUserApp {
    name: string;
    cpf: string;
    user: IUser;

}

export interface IToken {
    token: string;
}

// Request interfaces

export interface IProductRequest {
    description: string;
    info?: string;
    category: {};
    price: number;
    active: boolean;
    service: boolean;
    showcase: boolean;
    stockManagement: boolean;
    stock?: number;
}

// DTO interfaces

export interface IProductDTO {
    id?: number;
    description: string;
    info?: string;
    price: string | number;
    stock?: number;
    stockManagement: boolean;
    active: boolean;
    service: boolean;
    showcase: boolean;
    category: IProductCategory;
}