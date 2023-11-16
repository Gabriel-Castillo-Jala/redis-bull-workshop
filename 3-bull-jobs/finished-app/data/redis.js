const Redis = require('ioredis');

module.exports = new Redis({
  port: 6331,
  maxRetriesPerRequest: null
});
