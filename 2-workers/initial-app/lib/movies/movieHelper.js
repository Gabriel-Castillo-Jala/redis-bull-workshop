const _ = require('lodash');

const DataHelper = require('../../data/dataHelper');
const MovieAPIService = require('./movieApiService');

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

    await this.dataHelper.saveStatus('Loading');

    const validGenres = await this.apiService.getGenres();

    const mappedGenres = new Map(validGenres.map((genre) => [genre.name.toLowerCase(), genre.id]));

    const selectedGenres = [];
    for (const genre of genres) {
      const genreId = mappedGenres.get(genre.toLowerCase());

      if (!_.isNil(genreId)) {
        selectedGenres.push(genreId);
      }
    }

    if (_.isEmpty(selectedGenres)) {
      throw new Error(`Not a valid Genre. Please choose any of the following: ${[...mappedGenres.keys()].join(', ')}`);
    }

    const movies = await this.apiService.getMoviesByGenres(selectedGenres, validGenres);

    const sortedMovies = this._sortMoviesByGenre(movies, selectedGenres);
    await this.dataHelper.saveMovies(sortedMovies);
    await this.dataHelper.saveStatus('Loaded');
  }

  _sortMoviesByGenre(movies) {
    return _.sortBy(movies, (movie) => {
      return movie.genreLabels.length;
    });
  }
}

module.exports = MovieHelper;
