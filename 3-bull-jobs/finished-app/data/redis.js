import IORedis from 'ioredis';

export const redis = new IORedis({
  port: 6331,
  maxRetriesPerRequest: null
});
