const Redis = require('ioredis');

const redisInstance = new Redis({ port: 6331 });

const FIFO_KEY = 'bmq:fifo:queue';
const LIFO_KEY = 'bmq:lifo:queue';

class RedisManager {
  constructor() {

  }

  _stringify(queueContext) {
    return queueContext.map((el) => JSON.stringify(el));
  }

  async addToFifoQueue(queueContext) {
    await redisInstance.lpush(FIFO_KEY, this._stringify(queueContext));
  }

  async addToLifoQueue(queueContext) {
    await redisInstance.lpush(LIFO_KEY, this._stringify(queueContext));
  }
}

module.exports = new RedisManager();
