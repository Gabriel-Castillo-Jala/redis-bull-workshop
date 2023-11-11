import _ from 'lodash';

import { DataHelper } from '../../data/dataHelper.js';
import { MovieAPIService } from './movieApiService.js';
import { GenreFetchingQueue } from '../../queues/index.js';

export class MovieHelper {
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
