const { QUEUES } = require('../constants.js');
const { FetchGenresWorker } = require('./FetchGenresWorker.js');
const { FetchMoviesWorker } = require('./FetchMoviesWorker.js');
const { SortMoviesWorker } = require('./SortMoviesWorker.js');

new FetchGenresWorker(QUEUES.GENRE_FETCHING_QUEUE.name).startWork();
new FetchMoviesWorker(QUEUES.MOVIE_FETCHING_QUEUE.name).startWork();
new SortMoviesWorker(QUEUES.MOVIE_SORTING_QUEUE.name).startWork();
