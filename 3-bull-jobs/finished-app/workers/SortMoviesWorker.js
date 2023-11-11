import _ from 'lodash';
import { Worker } from 'bullmq';

import { Redis } from '../data/redis.js';
import { MovieMailingQueue } from '../queues/index.js';
import { DataHelper } from '../data/dataHelper.js';

export default class SortMoviesWorker {
  #queueName;
  #dataHelper;
  #opts = {};
  #movies = [];
  #defaultOpts = { concurrency: 5 };

  constructor(queueName, opts = {}) {
    this.#opts = opts;
    this.#queueName = queueName;
    this.#dataHelper = new DataHelper();
  }

  _sortMovies(movies) {
    this.#movies = _.sortBy(movies, (movie) => {
      return movie.genre_ids.length;
    });
  }

  startWork() {
    return new Worker(
      this.#queueName,  
      async ({ data }) => {
        try {
          console.log('Sorting movies...');
          this._sortMovies(data.movies);
          console.log('Movies sorted. Saving them to cache and mailing results.');
        } catch (err) {
          console.error(err);
        } finally {
          await this.#dataHelper.saveMovies(this.#movies);
          await this.#dataHelper.saveStatus('Loaded');
          await MovieMailingQueue.enqueue({ movieCount: this.#movies.length });
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
