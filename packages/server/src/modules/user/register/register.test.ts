import * as faker from "faker";
import { Connection } from "typeorm";
import { User } from "../../../entity/User";
import { createTestConnection } from "../../../testUtils/createTestConnection";
import { TestClient } from "../../../utils/TestClient";
import {
  DUPLICATE_EMAIL_ERROR_MSG,
  INVALID_EMAIL_ERROR_MSG,
  PASSWORD_MIN_LENGTH_ERROR_MSG
} from "./errorMessages";

let conn: Connection;
faker.seed(process.hrtime()[1]);
const email = faker.internet.email();
const password = faker.internet.password();

beforeAll(async () => {
  conn = await createTestConnection();
});

afterAll(async () => {
  await conn.close();
});

describe("Register resolver tests", async () => {
  test("Register user on success should return null and add user to db", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);
    const response = await client.register(email, password);
    expect(response.data).toEqual({ register: null });
    const users = await User.find({ where: { email } });
    expect(users).toHaveLength(1);
    const user = users[0];
    expect(user.email).toEqual(email);
    expect(user.password).not.toEqual(password);
  });

  test("Registering user with same email should return an array with error message", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);
    const response = await client.register(email, password);
    expect(response.data.register).toHaveLength(1);
    expect(response.data.register[0].path).toEqual("email");
    expect(response.data.register[0].message).toEqual(
      DUPLICATE_EMAIL_ERROR_MSG
    );
  });

  test("Email should be proper and password should be atleast five characters", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);
    const response = await client.register("fakeemail", "pas");
    expect(response.data.register).toHaveLength(2);
    expect(response.data.register[0].path).toEqual("email");
    expect(response.data.register[0].message).toEqual(INVALID_EMAIL_ERROR_MSG);
    expect(response.data.register[1].path).toEqual("password");
    expect(response.data.register[1].message).toEqual(
      PASSWORD_MIN_LENGTH_ERROR_MSG
    );
  });
});
