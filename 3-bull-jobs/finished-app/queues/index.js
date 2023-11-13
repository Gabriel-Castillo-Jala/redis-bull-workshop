import { QueueEvents } from 'bullmq';

import { redis } from '../data/redis.js';
import QueueEventHandler from './queueHandler.js';
import GenreFetchingQueue from './GenreFetchingQueue.js';
import MovieFetchingQueue from './MovieFetchingQueue.js';
import MovieSortingQueue  from './MovieSortingQueue.js';

// Init queue monitoring
new QueueEventHandler(new QueueEvents(MovieSortingQueue.queueName, { connection: redis })).listen();
new QueueEventHandler(new QueueEvents(GenreFetchingQueue.queueName, { connection: redis })).listen();
new QueueEventHandler(new QueueEvents(MovieFetchingQueue.queueName, { connection: redis })).listen();

export {
  GenreFetchingQueue,
  MovieFetchingQueue,
  MovieSortingQueue,
};
