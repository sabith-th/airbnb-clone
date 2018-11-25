import { validUserSchema } from "@abb/common";
import { User } from "../../../entity/User";
import { ResolverMap } from "../../../types/graphql-utils";
import { GQL } from "../../../types/schema";
import { formatYupError } from "../../../utils/formatYupError";
import { sendEmail } from "../../../utils/sendEmail";
import { createConfirmEmailLink } from "./createConfirmEmailLink";
import { DUPLICATE_EMAIL_ERROR_MSG } from "./errorMessages";

export const resolvers: ResolverMap = {
  Mutation: {
    register: async (
      _,
      args: GQL.IRegisterOnMutationArguments,
      { redis, url }
    ) => {
      try {
        await validUserSchema.validate(args, { abortEarly: false });
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
      if (process.env.NODE_ENV !== "test") {
        await sendEmail(
          email,
          await createConfirmEmailLink(url, user.id, redis)
        );
      }
      return null;
    }
  }
};
