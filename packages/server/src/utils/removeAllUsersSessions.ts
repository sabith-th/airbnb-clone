import { Redis } from "ioredis";
import { REDIS_SESSION_PREFIX, USER_SESSION_ID_PREFIX } from "../constants";

export const removeAllUsersSessions = async (userId: string, redis: Redis) => {
  const sessionIds = await redis.lrange(
    `${USER_SESSION_ID_PREFIX}${userId}`,
    0,
    -1
  );
  const promises = [];
  for (const sessionId of sessionIds) {
    promises.push(redis.del(`${REDIS_SESSION_PREFIX}${sessionId}`));
  }
  await Promise.all(promises);
};
