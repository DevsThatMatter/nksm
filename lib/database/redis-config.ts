import Redis from "ioredis";

const { REDIS_CONNECTION_URI } = process.env;
class RedisManager {
  private static client: null | Redis = null;

  public static getRedisClientInstance(): Redis {
    if (!RedisManager.client) {
      if (!REDIS_CONNECTION_URI) {
        throw new Error("Redis connection string is not present");
      }
      const client = new Redis(REDIS_CONNECTION_URI);
      return client;
    } else {
      return client;
    }
  }
}

export const client = RedisManager.getRedisClientInstance();
