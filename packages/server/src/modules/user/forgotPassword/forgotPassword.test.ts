import * as faker from "faker";
import * as Redis from "ioredis";
import { Connection } from "typeorm";
import { User } from "../../../entity/User";
import { createTestConnection } from "../../../testUtils/createTestConnection";
import { createForgotPasswordLink } from "../../../utils/createForgotPasswordLink";
import { forgotPasswordLockAccount } from "../../../utils/forgotPasswordLockAccount";
import { TestClient } from "../../../utils/TestClient";
import { FORGOT_PASSWORD_LOCKED_MSG } from "../login/errorMessages";
import { PASSWORD_MIN_LENGTH_ERROR_MSG } from "../register/errorMessages";
import { EXPIRED_KEY_ERROR_MSG } from "./errorMessages";

const redis = new Redis();
let userId: string;
let conn: Connection;
faker.seed(process.hrtime()[1]);
const email = faker.internet.email();
const password = faker.internet.password();
const newPassword = faker.internet.password();

beforeAll(async () => {
  conn = await createTestConnection();
  const user = await User.create({
    email,
    password,
    confirmed: true
  }).save();
  userId = user.id;
});

afterAll(async () => {
  await conn.close();
});

describe("forgotPassword resolver tests", () => {
  test("forgot password test", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);

    await forgotPasswordLockAccount(userId, redis);
    // Ensure user can't login once accound is locked
    expect(await client.login(email, password)).toEqual({
      data: {
        login: [
          {
            path: "email",
            message: FORGOT_PASSWORD_LOCKED_MSG
          }
        ]
      }
    });

    const url = await createForgotPasswordLink("", userId, redis);
    const parts = url.split("/");
    const key = parts[parts.length - 1];

    // Ensure new password meets the requirements
    expect(await client.forgotPasswordChange("a", key)).toEqual({
      data: {
        forgotPasswordChange: [
          {
            path: "newPassword",
            message: PASSWORD_MIN_LENGTH_ERROR_MSG
          }
        ]
      }
    });

    // Ensure user is able to change password successfully
    const response = await client.forgotPasswordChange(newPassword, key);
    expect(response.data).toEqual({ forgotPasswordChange: null });

    // Ensure user is not able to change password again with same key
    expect(
      await client.forgotPasswordChange(faker.internet.password(), key)
    ).toEqual({
      data: {
        forgotPasswordChange: [
          {
            path: "key",
            message: EXPIRED_KEY_ERROR_MSG
          }
        ]
      }
    });

    // Ensure user is able to login with new passoword
    expect(await client.login(email, newPassword)).toEqual({
      data: {
        login: null
      }
    });
  });
});
