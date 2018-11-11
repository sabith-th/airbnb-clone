import * as yup from "yup";

export const INVALID_EMAIL_ERROR_MSG = "Email must be a valid email";
export const PASSWORD_MIN_LENGTH_ERROR_MSG =
  "Password must be at least 5 characters";

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
