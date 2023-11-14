const _ = require('lodash');

const redis = require('./redis');
class DataHelper {

  constructor() {
    this.movieListKey = 'bmqpoc:movies';
    this.statusKey = 'bmqpoc:status';
  }

  _stringifyMovies(movies) {
    return movies.map((movie) => JSON.stringify(movie));
  }

  _jsonParseMovies(movies) {
    return movies.map(movie => JSON.parse(movie));
  }

  async flushMovies() {
    await redis.del(this.movieListKey);
  }

  async saveMovies(movies) {
    if (_.isNil(movies) || !_.isArray(movies) || _.isEmpty(movies)) {
      return;
    }

    await this.flushMovies();

    const formattedMovies = this._stringifyMovies(movies);

    await redis.lpush(this.movieListKey, formattedMovies);
    await redis.expire(this.movieListKey, 360); // 5 minutes to expire
  }

  async getMovies() {
    const moviesLength = await redis.llen('bmqpoc:movies');
    const movies = await redis.lrange('bmqpoc:movies', 0, moviesLength);

    if (_.isNil(movies) || !_.isArray(movies) || _.isEmpty(movies)) {
      return [];
    }

    return this._jsonParseMovies(movies);
  }

  async saveStatus(status) {
    await redis.del(this.statusKey);

    if (_.isEmpty(status)) {
      return;
    }

    await redis.set(this.statusKey, status);
    await redis.expire(this.statusKey, 360); // 5 minutes to expire
  }

  async getStatus() {
    const status = await redis.get(this.statusKey);

    if (_.isEmpty(status)) {
      return '';
    }

    return status;
  }
}

module.exports = DataHelper;
