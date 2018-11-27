import * as yup from "yup";

export const INVALID_EMAIL_ERROR_MSG = "Email must be a valid email";
export const PASSWORD_MIN_LENGTH_ERROR_MSG =
  "Password must be at least 5 characters";
export const INVALID_LOGIN = "Invalid Login";

export const registerPasswordValidation = yup
  .string()
  .min(5, PASSWORD_MIN_LENGTH_ERROR_MSG)
  .max(255)
  .required();

export const validUserSchema = yup.object().shape({
  email: yup
    .string()
    .min(5)
    .max(255)
    .email(INVALID_EMAIL_ERROR_MSG)
    .required(),
  password: registerPasswordValidation
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .min(5, INVALID_LOGIN)
    .max(255, INVALID_LOGIN)
    .email(INVALID_LOGIN)
    .required(),
  password: yup
    .string()
    .min(5, INVALID_LOGIN)
    .max(255, INVALID_LOGIN)
    .required()
});

export const changePasswordSchema = yup.object().shape({
  newPassword: registerPasswordValidation
});
