const { QueueEvents } = require('bullmq');

const { redis } = require('../data/redis.js');
const { QueueEventHandler } = require('./queueHandler.js');
const { GenreFetchingQueue } = require('./GenreFetchingQueue.js');
const { MovieFetchingQueue } = require('./MovieFetchingQueue.js');
const { MovieSortingQueue } = require('./MovieSortingQueue.js');

// Init queue monitoring
new QueueEventHandler(new QueueEvents(MovieSortingQueue.queueName, { connection: redis })).listen();
new QueueEventHandler(new QueueEvents(GenreFetchingQueue.queueName, { connection: redis })).listen();
new QueueEventHandler(new QueueEvents(MovieFetchingQueue.queueName, { connection: redis })).listen();

module.exports = {
  GenreFetchingQueue,
  MovieFetchingQueue,
  MovieSortingQueue,
};
