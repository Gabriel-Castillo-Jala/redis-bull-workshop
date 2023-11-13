const QUEUES = {
  GENRE_FETCHING_QUEUE: {
    name: 'genre-fetching-queue',
    jobName: 'fetch-movie-genres',
  },
  MOVIE_FETCHING_QUEUE: {
    name: 'movie-fetching-queue',
    jobName: 'fetch-movies',
  },
  MOVIE_SORTING_QUEUE: {
    name: 'movie-sorting-queues',
    jobName: 'sort-movies',
  },
};

const ARENA_CONFIG = [
  {
    type: 'bullmq',
    name: QUEUES.GENRE_FETCHING_QUEUE.name,
    hostId: 'Genre Fetching Queue',
    redis: { port: 6331 }

  },
  {
    type: 'bullmq',
    name: QUEUES.MOVIE_FETCHING_QUEUE.name,
    hostId: 'Movie Fetching Queue',
    redis: { port: 6331 }

  },
  {
    type: 'bullmq',
    name: QUEUES.MOVIE_SORTING_QUEUE.name,
    hostId: 'Movie Sorting Queue',
    redis: { port: 6331 }
  }
]

module.exports.QUEUES = QUEUES;
module.exports.ARENA_CONFIG = ARENA_CONFIG;
