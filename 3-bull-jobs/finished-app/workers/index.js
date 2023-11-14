const { QUEUES } = require('../constants');
const { FetchGenresWorker } = require('./FetchGenresWorker');
const { FetchMoviesWorker } = require('./FetchMoviesWorker');
const { SortMoviesWorker } = require('./SortMoviesWorker');

new FetchGenresWorker(QUEUES.GENRE_FETCHING_QUEUE.name).startWork();
new FetchMoviesWorker(QUEUES.MOVIE_FETCHING_QUEUE.name).startWork();
new SortMoviesWorker(QUEUES.MOVIE_SORTING_QUEUE.name).startWork();
