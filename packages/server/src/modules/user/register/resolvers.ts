import * as yup from "yup";
import { User } from "../../../entity/User";
import { ResolverMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { formatYupError } from "../../../utils/formatYupError";
import { sendEmail } from "../../../utils/sendEmail";
import { registerPasswordValidation } from "../../../yupSchemas";
import { createConfirmEmailLink } from "./createConfirmEmailLink";
import {
  DUPLICATE_EMAIL_ERROR_MSG,
  INVALID_EMAIL_ERROR_MSG
} from "./errorMessages";

const schema = yup.object().shape({
  email: yup
    .string()
    .min(5)
    .max(255)
    .email(INVALID_EMAIL_ERROR_MSG),
  password: registerPasswordValidation
});

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (
      _,
      args: GQL.IRegisterOnMutationArguments,
      { redis, url }
    ) => {
      try {
        await schema.validate(args, { abortEarly: false });
      } catch (error) {
        return formatYupError(error);
      }
      const { email, password } = args;
      const userAlreadyExists = await User.findOne({
        where: { email },
        select: ["id"]
      });
      if (userAlreadyExists) {
        return [
          {
            path: "email",
            message: DUPLICATE_EMAIL_ERROR_MSG
          }
        ];
      }
      const user = User.create({
        email,
        password
      });
      await user.save();
      if (process.env.NODE_ENV === "production") {
        await sendEmail(
          email,
          await createConfirmEmailLink(url, user.id, redis)
        );
      }
      return null;
    }
  }
};
