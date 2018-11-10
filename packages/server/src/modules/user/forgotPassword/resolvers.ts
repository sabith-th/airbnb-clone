import * as bcrypt from "bcryptjs";
import * as yup from "yup";
import { FORGOT_PASSWORD_PREFIX } from "../../../constants";
import { User } from "../../../entity/User";
import { ResolverMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { createForgotPasswordLink } from "../../../utils/createForgotPasswordLink";
import { forgotPasswordLockAccount } from "../../../utils/forgotPasswordLockAccount";
import { formatYupError } from "../../../utils/formatYupError";
import { registerPasswordValidation } from "../../../yupSchemas";
import {
  EXPIRED_KEY_ERROR_MSG,
  USER_NOT_FOUND_ERROR_MSG
} from "./errorMessages";

const schema = yup.object().shape({
  newPassword: registerPasswordValidation
});

export const resolvers: ResolverMap = {
  Mutation: {
    sendForgotPasswordEmail: async (
      _,
      { email }: GQL.ISendForgotPasswordEmailOnMutationArguments,
      { redis }
    ) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return [
          {
            path: "email",
            message: USER_NOT_FOUND_ERROR_MSG
          }
        ];
      }
      await forgotPasswordLockAccount(user.id, redis);
      // @todo add frontend url
      await createForgotPasswordLink("", user.id, redis);
      // @todo send email
      return true;
    },
    forgotPasswordChange: async (
      _,
      { newPassword, key }: GQL.IForgotPasswordChangeOnMutationArguments,
      { redis }
    ) => {
      const redisKey = `${FORGOT_PASSWORD_PREFIX}${key}`;
      const userId = await redis.get(redisKey);

      if (!userId) {
        return [
          {
            path: "key",
            message: EXPIRED_KEY_ERROR_MSG
          }
        ];
      }

      try {
        await schema.validate({ newPassword }, { abortEarly: false });
      } catch (error) {
        return formatYupError(error);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updatePromise = User.update(
        { id: userId },
        { password: hashedPassword, forgotPasswordLocked: false }
      );
      const deleteRedisKeyPromise = redis.del(redisKey);
      await Promise.all([updatePromise, deleteRedisKeyPromise]);

      return null;
    }
  }
};
