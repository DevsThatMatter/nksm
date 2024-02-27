import Redis from "ioredis";

const { REDIS_HOST,
    REDIS_PORT,
    REDIS_USERNAME,
    REDIS_PASSWORD } = process.env;

let client: null | Redis;

if (REDIS_PORT !== undefined && REDIS_USERNAME !== undefined && REDIS_PASSWORD != undefined && REDIS_HOST !== undefined) {
    console.log("port=>", REDIS_PORT, "username=>", REDIS_USERNAME, "PASSWORD=>", REDIS_PASSWORD, "HOST=>", REDIS_HOST)
    client = new Redis({
        host: REDIS_HOST,
        port: parseInt(REDIS_PORT),
        username: REDIS_USERNAME,
        password: REDIS_PASSWORD
    });
}

export { client };
