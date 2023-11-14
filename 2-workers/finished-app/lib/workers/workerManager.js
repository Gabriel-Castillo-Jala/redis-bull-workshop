const { Worker } = require('worker_threads');

class WorkerManager {
  constructor() {
    this.CONCURRENT_WORKERS = 10;
    this.MAX_PAGE_NUMBER = 1000;
  }

  _chunkify() {
    let pagesPerWorker = Math.round(this.MAX_PAGE_NUMBER / this.CONCURRENT_WORKERS);

    const workerConfigs = [];
    let startPage = 1;
    let endPage;

    for (let i = 0; i < this.CONCURRENT_WORKERS; i++) {
      if (i === this.CONCURRENT_WORKERS - 1) {
        endPage = this.MAX_PAGE_NUMBER;
      } else {
        endPage = startPage + pagesPerWorker - 1;
      }

      workerConfigs.push({ startPage, endPage });

      startPage = endPage + 1;
    }

    return workerConfigs;
  }

  async promisifyWorker(config, opts, genres, validGenres) {
    return new Promise((resolve, reject) => {

      const worker = new Worker(`${__dirname}/worker.js`, {
        workerData: {
          startPage: config.startPage,
          endPage: config.endPage,
          fetchOpts: opts,
          genres,
          validGenres,
        },
      });

      worker.once('message', (data) => {
        resolve(data);
      });

      worker.once('error', (error) => {
        reject(error);
      });
    });
  }

  async run(opts, genres, validGenres) {
    const workersConfig = this._chunkify();

    const workers = [];
    for (const config of workersConfig) {
      workers.push(this.promisifyWorker(config, opts, genres, validGenres));
    }

    const workerResults = await Promise.all(workers);
    const movies = [];

    for (const result of workerResults) {
      movies.push(...result);
    }

    return movies;
  }
}

module.exports = WorkerManager;
