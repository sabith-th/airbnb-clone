export interface LoginMutation_login {
    __typename: "Error";
    path: string;
    message: string;
}
export interface LoginMutation {
    login: LoginMutation_login[] | null;
}
export interface LoginMutationVariables {
    email: string;
    password: string;
}
export interface RegisterMutation_register {
    __typename: "Error";
    path: string;
    message: string;
}
export interface RegisterMutation {
    register: RegisterMutation_register[] | null;
}
export interface RegisterMutationVariables {
    email: string;
    password: string;
}
