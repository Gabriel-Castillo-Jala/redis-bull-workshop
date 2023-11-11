import { QUEUES } from '../constants.js';
import FetchGenresWorker from './FetchGenresWorker.js';
import FetchMoviesWorker from './FetchMoviesWorker.js';
import SortMoviesWorker from './SortMoviesWorker.js';

new FetchGenresWorker(QUEUES.GENRE_FETCHING_QUEUE.name).startWork();
new FetchMoviesWorker(QUEUES.MOVIE_FETCHING_QUEUE.name).startWork();
new SortMoviesWorker(QUEUES.MOVIE_SORTING_QUEUE.name).startWork();
