export interface LoginFormType {
    username: string,
    password: string,
    isRemember: boolean
}
export interface RegFormType {
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
    confirm_password: string,
    accept_terms: boolean
}

export type FirstNameFormTypePart = Pick<RegFormType, 'first_name'>;
export type LastNameFormTypePart = Pick<RegFormType, 'last_name'>;
export type UsernameFormTypePart = Pick<RegFormType, 'username'>;
export type EmailFormTypePart = Pick<RegFormType, 'email'>;
export type PasswordFormTypePart = Pick<RegFormType, 'password'>;
export type ConfirmPasswordTypePart = Pick<RegFormType, 'confirm_password'>;
export type AcceptTermsTypePart = Pick<RegFormType, 'accept_terms'>;