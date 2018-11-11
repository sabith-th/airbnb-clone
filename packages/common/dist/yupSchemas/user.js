"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
exports.INVALID_EMAIL_ERROR_MSG = "Email must be a valid email";
exports.PASSWORD_MIN_LENGTH_ERROR_MSG = "Password must be at least 5 characters";
exports.registerPasswordValidation = yup
    .string()
    .min(5, exports.PASSWORD_MIN_LENGTH_ERROR_MSG)
    .max(255)
    .required();
exports.validUserSchema = yup.object().shape({
    email: yup
        .string()
        .min(5)
        .max(255)
        .email(exports.INVALID_EMAIL_ERROR_MSG)
        .required(),
    password: exports.registerPasswordValidation
});
//# sourceMappingURL=user.js.map