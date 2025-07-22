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
export interface VerifyAccount {
    code: number
}

export type FirstNameFormTypePart = Pick<RegFormType, 'first_name'>;
export type LastNameFormTypePart = Pick<RegFormType, 'last_name'>;
export type UsernameFormTypePart = Pick<RegFormType, 'username'>;
export type EmailFormTypePart = Pick<RegFormType, 'email'>;
export type PasswordFormTypePart = Pick<RegFormType, 'password'>;
export type ConfirmPasswordTypePart = Pick<RegFormType, 'confirm_password'>;
export type AcceptTermsTypePart = Pick<RegFormType, 'accept_terms'>;

export interface Figures {
    figure_1: number,
    figure_2: number,
    figure_3: number,
    figure_4: number,
    figure_5: number,
    figure_6: number
}

export type Actions = 'register' | 'email' | 'password'

export interface ResetData {
    email: string,
    header: string,
    title: string,
    action: Actions
}