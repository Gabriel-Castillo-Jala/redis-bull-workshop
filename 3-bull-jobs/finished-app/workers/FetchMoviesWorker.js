import _ from 'lodash';
import { Worker } from 'bullmq';

import { Redis } from '../data/redis.js';
import { MovieSortingQueue } from '../queues/index.js';
import { MovieAPIService } from '../lib/movies/movieApiService.js';

export default class FetchMoviesWorker {
  #queueName;
  #apiService;
  #opts = {};
  #movies = [];
  #defaultOpts = { concurrency: 5 };

  constructor(queueName, opts = {}) {
    this.#opts = opts;
    this.#queueName = queueName;
    this.#apiService = new MovieAPIService();
  }

  async _fetchMovies(selectedGenres) {
    this.#movies = await this.#apiService.getMoviesByGenres(selectedGenres);
  }

  startWork() {
    return new Worker(
      this.#queueName,  
      async ({ data }) => {
        try {
          console.log('Fetching movies...');
          await this._fetchMovies(data.selectedGenres);
          console.log('Movies fetched. Starting sort...');
        } catch (err) {
          console.error(err);
        } finally {
          await MovieSortingQueue.enqueue({ movies: this.#movies });
        }
      },
      {
        connection: Redis,
        ...this.#defaultOpts,
        ...this.#opts,
      }
    );
  }
}
