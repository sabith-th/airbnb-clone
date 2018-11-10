import * as yup from "yup";
import { PASSWORD_MIN_LENGTH_ERROR_MSG } from "./modules/user/register/errorMessages";

export const registerPasswordValidation = yup
  .string()
  .min(5, PASSWORD_MIN_LENGTH_ERROR_MSG)
  .max(255);
