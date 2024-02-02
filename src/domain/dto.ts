export interface UserLoginDTO {
    email: string;
    password: string;
}

export interface UserRegisterDTO {
    name: string;
    company_name: string;
    email: string;
    mobile: string;
    password: string;
    password_confirmation: string;
}