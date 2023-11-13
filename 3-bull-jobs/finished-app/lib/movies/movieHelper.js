const _ = require('lodash');

const { DataHelper } = require('../../data/dataHelper.js');
const { MovieAPIService } = require('./movieApiService.js');
const { GenreFetchingQueue } = require('../../queues/index.js');

class MovieHelper {
  constructor() {
    this.apiService = new MovieAPIService();
    this.dataHelper = new DataHelper();
  }

  async getCurrentMovieStatus() {
    const status = await this.dataHelper.getStatus();

    if (_.isEmpty(status)) {
      return 'No pending requests.';
    } else if (_.isEqual(status, 'Loading')) {
      return 'Request in progress...';
    } else if (_.isEqual(status, 'Loaded')) {
      return 'Request is ready!'
    }
  }

  async getLoadedMovies() {
    const movies = await this.dataHelper.getMovies();

    if (_.isNil(movies) || _.isEmpty(movies)) {
      return [];
    }

    return movies;
  }

  async filterMoviesByGenre(genres) {
    if (!genres || !Array.isArray(genres) || genres.length <= 0) {
      throw new Error('Need at least a genre to filter');
    }

    await GenreFetchingQueue.enqueue({ genres });
  }
}

module.exports.MovieHelper = MovieHelper;
