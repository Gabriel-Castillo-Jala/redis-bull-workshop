const _ =  require('lodash');
const { Worker } =  require('bullmq');

const redis =  require('../data/redis');
const DataHelper =  require('../data/dataHelper');
const MovieAPIService =  require('../lib/movies/movieApiService');
const { MovieFetchingQueue } =  require('../queues');

class FetchGenresWorker {
  #queueName;
  #apiService;
  #dataHelper;
  #opts = {};
  #genres = [];
  #genreMap = new Map();
  #defaultOpts = { concurrency: 5 };

  constructor(queueName, opts = {}) {
    this.#opts = opts;
    this.#queueName = queueName;
    this.#dataHelper = new DataHelper();
    this.#apiService = new MovieAPIService();
  }

  async _fetchGenres() {
    this.#genres = await this.#apiService.getGenres();
  }

  _mapGenres() {
    this.#genreMap = new Map(
      this.#genres.map((genre) => [genre.name.toLowerCase(), genre.id])
    );
  }

  _pickGenres(requestedGenres) {
    this.#genres = [];
    for (const genre of requestedGenres) {
      const genreId = this.#genreMap.get(genre.toLowerCase());

      if (!_.isNil(genreId)) {
        this.#genres.push(genreId);
      }

      this.#genres;
    }
  }

  startWork() {
    return new Worker(
      this.#queueName,
      async (job) => {
        job.progress = 0;
        console.log('Fetching genres..');
        await this.#dataHelper.saveStatus('Loading');

        await this._fetchGenres();
        this._mapGenres();
        this._pickGenres(job.data.genres);

        // One third of the progress made.
        await job.updateProgress({ part: 1, completion: 33, job: 'fetch and sort genres' });
        await MovieFetchingQueue.enqueue({ selectedGenres: this.#genres });
      },
      {
        connection: redis,
        ...this.#defaultOpts,
        ...this.#opts,
      }
    );
  }
}

module.exports.FetchGenresWorker = FetchGenresWorker;
