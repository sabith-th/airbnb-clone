import * as faker from "faker";
import * as Redis from "ioredis";
import fetch from "node-fetch";
import { Connection } from "typeorm";
import { User } from "../../../entity/User";
import { createTestConnection } from "../../../testUtils/createTestConnection";
import { createConfirmEmailLink } from "./createConfirmEmailLink";

let userId: string;
const redis = new Redis();
faker.seed(process.hrtime()[1]);

let conn: Connection;

beforeAll(async () => {
  conn = await createTestConnection();
  const user = await User.create({
    email: faker.internet.email(),
    password: faker.internet.email()
  }).save();
  userId = user.id;
});

afterAll(async () => {
  await conn.close();
});

describe("ConfirmEmailLink tests", async () => {
  test("createConfirmEmailLink should return url, get call should return ok and clear key in redis", async () => {
    const url = await createConfirmEmailLink(
      process.env.TEST_HOST as string,
      userId,
      redis
    );
    const response = await fetch(url);
    const text = await response.text();
    expect(text).toEqual("ok");
    const user = await User.findOne({ where: { id: userId } });
    expect((user as User).confirmed).toBeTruthy();
    const chunks = url.split("/");
    const key = chunks[chunks.length - 1];
    const value = await redis.get(key);
    expect(value).toBeNull();
  });
});
