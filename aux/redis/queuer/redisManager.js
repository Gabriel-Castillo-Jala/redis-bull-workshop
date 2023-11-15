const Redis = require('ioredis');

const redisInstance = new Redis({ port: 6331 });

const FIFO_KEY = 'bmq:fifo:queue';
const LIFO_KEY = 'bmq:lifo:queue';

class RedisManager {
  constructor() {

  }

  async popFifoQueue() {
    const queue = await redisInstance.rpop(FIFO_KEY);
    return JSON.parse(queue);
  }

  async popLifoQueue(queueContext) {
    const queue = await redisInstance.lpop(LIFO_KEY);
    return JSON.parse(queue);
  }
}

module.exports = new RedisManager();
