const { QueueEvents } = require('bullmq');

const redis = require('../data/redis');
const { QueueEventHandler } = require('./queueHandler');
const { GenreFetchingQueue } = require('./GenreFetchingQueue');
const { MovieFetchingQueue } = require('./MovieFetchingQueue');
const { MovieSortingQueue } = require('./MovieSortingQueue');

// Init queue monitoring
new QueueEventHandler(new QueueEvents(MovieSortingQueue.queueName, { connection: redis })).listen();
new QueueEventHandler(new QueueEvents(GenreFetchingQueue.queueName, { connection: redis })).listen();
new QueueEventHandler(new QueueEvents(MovieFetchingQueue.queueName, { connection: redis })).listen();

module.exports = {
  GenreFetchingQueue,
  MovieFetchingQueue,
  MovieSortingQueue,
};
