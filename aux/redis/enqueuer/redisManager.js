const Redis = require('ioredis');

const redisInstance = new Redis({ port: 6331 });

const FIFO_KEY = 'bmq:fifo:queue';
const LIFO_KEY = 'bmq:lifo:queue';

class RedisManager {
  constructor() {

  }

  async addToFifoQueue(queueContext) {
    await redisInstance.lpush(FIFO_KEY, [JSON.stringify(queueContext)]);
  }

  async addToLifoQueue(queueContext) {
    await redisInstance.lpush(LIFO_KEY, [JSON.stringify(queueContext)]);
  }
}

module.exports = new RedisManager();
