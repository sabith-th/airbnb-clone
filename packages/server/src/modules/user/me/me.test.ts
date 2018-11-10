import * as faker from "faker";
import { Connection } from "typeorm";
import { User } from "../../../entity/User";
import { createTestConnection } from "../../../testUtils/createTestConnection";
import { TestClient } from "../../../utils/TestClient";

let userId: string;
let conn: Connection;
faker.seed(process.hrtime()[1]);
const email = faker.internet.email();
const password = faker.internet.password();

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

describe("me resolver tests", () => {
  test("should return null if user not logged in", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);
    const response = await client.me();
    expect(response.data.me).toBeNull();
  });

  test("should return current logged in user", async () => {
    const client = new TestClient(process.env.TEST_HOST as string);
    await client.login(email, password);
    const response = await client.me();
    expect(response.data).toEqual({
      me: {
        id: userId,
        email
      }
    });
  });
});
