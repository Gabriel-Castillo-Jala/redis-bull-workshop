const IORedis = require('ioredis');

module.exports.redis = new IORedis({
  port: 6331,
  maxRetriesPerRequest: null
});
