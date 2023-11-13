const { Worker } = require('bullmq');

const { redis } = require('../data/redis.js');
const { MovieSortingQueue } = require('../queues/index.js');
const { MovieAPIService } = require('../lib/movies/movieApiService.js');

class FetchMoviesWorker {
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
      async (job) => {
        job.progress = 0;
        console.log('Fetching movies...');
        await this._fetchMovies(job.data.selectedGenres);
        // Two thirds of the progress made.
        await job.updateProgress({ part: 2, completion: 67, job: 'fetch movies' });
        console.log("Movies fetched. Starting sort...");
        await MovieSortingQueue.enqueue({ movies: this.#movies });
      },
      {
        connection: redis,
        ...this.#defaultOpts,
        ...this.#opts,
      }
    );
  }
}

module.exports.FetchMoviesWorker = FetchMoviesWorker;
