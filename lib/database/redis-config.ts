import Redis from "ioredis";

const { REDIS_HOST, REDIS_PORT, REDIS_USERNAME, REDIS_PASSWORD } = process.env;
class RedisManager {
  private static client: null | Redis = null;

  public static getRedisClientInstance(): Redis {
    if (!RedisManager.client) {
      RedisManager.client = new Redis({
        host: REDIS_HOST!,
        port: parseInt(REDIS_PORT!),
        username: REDIS_USERNAME!,
        password: REDIS_PASSWORD!,
      });
      return RedisManager.client;
    } else {
      return RedisManager.client;
    }
  }
}

export const client = RedisManager.getRedisClientInstance();
