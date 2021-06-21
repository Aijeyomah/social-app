import { RedisPubSub } from "graphql-redis-subscriptions";
import * as redis from "ioredis";
import { withFilter } from "apollo-server-express";
import config from "../../../config";

const { NODE_ENV, REDIS_DOMAIN_NAME, REDIS_PORT_NUMBER } = config;

const retryStrategy = (times) => Math.min(times * 50, 2000);

let redisClient;

if (NODE_ENV === "production") {
  const configOptions = {
    host: REDIS_DOMAIN_NAME,
    port: REDIS_PORT_NUMBER,
    retryStrategy: retryStrategy,
  };
  redisClient = redis.createClient(configOptions);
} else {
  let options = {
    retryStrategy: retryStrategy,
  };
  redisClient = redis.createClient(options);
}

const pubsub = new RedisPubSub({
  publisher: redisClient,
  subscriber: redisClient,
});

export { pubsub, withFilter };