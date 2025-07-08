
export interface RegisterData {
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
    confirm_password: string
}

export type UserType = Omit<RegisterData, 'confirm_password'>

export type VerifyCodeType = { code: string };

export interface LoginData {
    username: string,
    password: string,
    isRemember: boolean
}

export interface NewUserData extends Omit<UserType, 'email' | 'password'> {};

export type NewEmail = { email: string };
export type NewPassword = { new_password: string, new_confirm_password: string }