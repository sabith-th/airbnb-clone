import { changePasswordSchema } from "@abb/common";
import * as bcrypt from "bcryptjs";
import { FORGOT_PASSWORD_PREFIX } from "../../../constants";
import { User } from "../../../entity/User";
import { ResolverMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { createForgotPasswordLink } from "../../../utils/createForgotPasswordLink";
import { forgotPasswordLockAccount } from "../../../utils/forgotPasswordLockAccount";
import { formatYupError } from "../../../utils/formatYupError";
import { sendEmail } from "../../../utils/sendEmail";
import {
  EXPIRED_KEY_ERROR_MSG,
  USER_NOT_FOUND_ERROR_MSG
} from "./errorMessages";

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

      const url = await createForgotPasswordLink(
        process.env.FRONTEND_HOST as string,
        user.id,
        redis
      );

      await sendEmail(email, url, "Reset Password");
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
            path: "newPassword",
            message: EXPIRED_KEY_ERROR_MSG
          }
        ];
      }

      try {
        await changePasswordSchema.validate(
          { newPassword },
          { abortEarly: false }
        );
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
