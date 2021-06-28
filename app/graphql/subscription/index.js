
import { RedisPubSub } from "graphql-redis-subscriptions";
import redis from "ioredis";
import { withFilter } from "apollo-server-express";
import config from "../../../config";


const { NODE_ENV, REDIS_DOMAIN_NAME, REDIS_PORT_NUMBER } = config;
const retryStrategy = (times) => Math.min(times * 50, 2000);
let configOptions;
if (NODE_ENV === "production") {
  configOptions = {
    host: REDIS_DOMAIN_NAME,
    port: REDIS_PORT_NUMBER,
    retryStrategy: retryStrategy,
  };
} else {
  configOptions = {
    retryStrategy: retryStrategy,
  };
}
const pubsub = new RedisPubSub({
  publisher: new redis(configOptions),
  subscriber: new redis(configOptions)
});
export { pubsub, withFilter };