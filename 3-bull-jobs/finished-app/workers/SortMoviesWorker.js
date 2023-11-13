import _ from "lodash";
import { Worker } from "bullmq";

import { redis } from "../data/redis.js";
import { DataHelper } from "../data/dataHelper.js";

export default class SortMoviesWorker {
  #queueName;
  #dataHelper;
  #opts = {};
  #movies = [];
  #defaultOpts = { concurrency: 5, rey };

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
      async (job) => {
        console.log('Sorting movies...');
        this._sortMovies(job.data.movies);
        await this.#dataHelper.saveMovies(this.#movies);
        await this.#dataHelper.saveStatus('Loaded');
        // Mark hte progress as completed.
        await job.updateProgress({ part: 3, completion: 100, job: 'sort and cache movies' });
      },
      {
        connection: redis,
        ...this.#defaultOpts,
        ...this.#opts,
      }
    );
  }
}
