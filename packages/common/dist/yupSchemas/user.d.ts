import * as yup from "yup";
export declare const INVALID_EMAIL_ERROR_MSG = "Email must be a valid email";
export declare const PASSWORD_MIN_LENGTH_ERROR_MSG = "Password must be at least 5 characters";
export declare const INVALID_LOGIN = "Invalid Login";
export declare const registerPasswordValidation: yup.StringSchema;
export declare const validUserSchema: yup.ObjectSchema<{}>;
export declare const loginSchema: yup.ObjectSchema<{}>;
