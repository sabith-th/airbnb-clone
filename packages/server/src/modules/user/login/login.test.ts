import * as faker from "faker";
import { Connection } from "typeorm";
import { User } from "../../../entity/User";
import { createTypeORMConnection } from "../../../utils/createTypeORMConnection";
import { TestClient } from "../../../utils/TestClient";
import { CONFIRM_EMAIL_MSG, INVALID_LOGIN_MSG } from "./errorMessages";

let conn: Connection;
faker.seed(process.hrtime()[1]);
const email = faker.internet.email();
const password = faker.internet.password();

beforeAll(async () => {
  conn = await createTypeORMConnection();
});

afterAll(async () => {
  await conn.close();
});

const loginExpectError = async (e: string, p: string, errorMessage: string) => {
  const client = new TestClient(process.env.TEST_HOST as string);
  const response = await client.login(e, p);
  expect(response.data).toEqual({
    login: [
      {
        path: "email",
        message: errorMessage
      }
    ]
  });
};

describe("Login resolver tests", async () => {
  test("bad email should return error response", async () => {
    await loginExpectError(
      faker.internet.email(),
      faker.internet.password(),
      INVALID_LOGIN_MSG
    );
  });

  test("bad password should return error response", async () => {
    const invalidPassword = faker.internet.password();
    const client = new TestClient(process.env.TEST_HOST as string);
    const registerResponse = await client.register(email, password);
    expect(registerResponse.data).toEqual({ register: null });
    await loginExpectError(email, invalidPassword, INVALID_LOGIN_MSG);
  });

  test("not confirmed users should get not confirmed message", async () => {
    await loginExpectError(email, password, CONFIRM_EMAIL_MSG);
  });

  test("confirmed users should get null response", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await User.update({ email }, { confirmed: true });
    const response = await client.login(email, password);
    expect(response.data).toEqual({ login: null });
  });
});
