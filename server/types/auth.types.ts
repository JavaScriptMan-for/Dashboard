export interface RegisterData {
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
    confirm_password: string
}
export interface LoginData {
    username: string,
    password: string,
    isRemember: boolean
}