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
    name_initials: string;
    avatar: string;
    mobile: string;
    created_at: string;
    updated_at: string;
}

export interface IUserResponse {
    id: number;
    full_name: string;
    email: string;
    mobile: string;
    picture: string;
}

export interface IProviderResponse {
    id: number;
    full_name: string;
    vtr: string;
    email: string;
    mobile: string;
    avatar: string;
    latitude: number;
    longitude: number;
}

export interface IServiceTypeResponse {
    id: number;
    name: string;
    image: string;
    status: number;
    is_visible: number;
}

export interface ITripResponse {
    id: number;
    booking_id: string;
    s_address: string;
    s_latitude: number;
    s_longitude: number;
    d_address: string;
    d_latitude: number;
    d_longitude: number;
    accept_latitude: number;
    accept_longitude: number;
    assigned_at: string;
    started_at: string;
    finished_at: string;
    route_key: string;
    cancel_reason: string;
    estimated_fare: number;
    user: IUserResponse;
    provider: IProviderResponse;
    service_type: IServiceTypeResponse;
    status: string;
    badge: string;
    current_provider_id: number;
    created_at: string;
    updated_at: string;
}

export interface IUserInfoResponse {
    id: number;
    name: string;
    email: string;
    avatar: string;
    fantasyName: string;
    active: boolean;
    created_at: string;
    updated_at: string;
    info: string;
}

export interface IUploadResponse {
    avatar: string;
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