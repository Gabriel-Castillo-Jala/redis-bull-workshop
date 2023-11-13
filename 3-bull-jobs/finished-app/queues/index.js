import { QueueEvents } from 'bullmq';

import { Redis } from '../data/redis.js';
import QueueEventListener from './queueHandler.js';
import GenreFetchingQueue from './GenreFetchingQueue.js';
import MovieFetchingQueue from './MovieFetchingQueue.js';
import MovieSortingQueue  from './MovieSortingQueue.js';

// Init queue monitoring
new QueueEventListener(new QueueEvents(MovieSortingQueue.queueName, { connection: Redis })).listen();
new QueueEventListener(new QueueEvents(GenreFetchingQueue.queueName, { connection: Redis })).listen();
new QueueEventListener(new QueueEvents(MovieFetchingQueue.queueName, { connection: Redis })).listen();

export {
  GenreFetchingQueue,
  MovieFetchingQueue,
  MovieSortingQueue,
};
