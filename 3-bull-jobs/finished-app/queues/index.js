import QueueHandler       from './queueHandler.js';
import GenreFetchingQueue from './GenreFetchingQueue.js';
import MovieFetchingQueue from './MovieFetchingQueue.js';
import MovieMailingQueue  from './MovieMailingQueue.js';
import MovieSortingQueue  from './MovieSortingQueue.js';

// Init queue monitoring
new QueueHandler(GenreFetchingQueue);
new QueueHandler(MovieFetchingQueue);
new QueueHandler(MovieMailingQueue);
new QueueHandler(MovieSortingQueue);

export {
  GenreFetchingQueue,
  MovieFetchingQueue,
  MovieMailingQueue,
  MovieSortingQueue,
};
