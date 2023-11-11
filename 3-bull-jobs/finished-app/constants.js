export const QUEUES = {
  GENRE_FETCHING_QUEUE: {
    name: 'genre-fetching-queue',
    jobName: 'fetch-movie-genres',
  },
  MOVIE_FETCHING_QUEUE: {
    name: 'movie-fetching-queue',
    jobName: 'fetch-movies',
  },
  MOVIE_MAILING_QUEUE: {
    name: 'movie-mailing-queue',
    jobName: 'email-movie-details',
  },
  MOVIE_SORTING_QUEUE: {
    name: 'movie-sorting-queues',
    jobName: 'sort-movies',
  },
};