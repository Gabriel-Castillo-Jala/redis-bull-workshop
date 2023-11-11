import _ from 'lodash';

import { Redis } from './redis.js';

export class DataHelper {

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
    await Redis.del(this.movieListKey);
  }

  async saveMovies(movies) {
    if (_.isNil(movies) || !_.isArray(movies) || _.isEmpty(movies)) {
      return;
    }

    await this.flushMovies;

    const formattedMovies = this._stringifyMovies(movies);

    await Redis.lpush(this.movieListKey, formattedMovies);
    await Redis.expire(this.movieListKey, 360); // 5 minutes to expire
  }

  async getMovies() {
    const moviesLength = await Redis.llen('bmqpoc:movies');
    const movies = await Redis.lrange('bmqpoc:movies', 0, moviesLength);

    if (_.isNil(movies) || !_.isArray(movies) || _.isEmpty(movies)) {
      return [];
    }

    return this._jsonParseMovies(movies);
  }

  async saveStatus(status) {
    await Redis.del(this.statusKey);

    if (_.isEmpty(status)) {
      return;
    }

    await Redis.set(this.statusKey, status);
    await Redis.expire(this.statusKey, 360); // 5 minutes to expire
  }

  async getStatus() {
    const status = await Redis.get(this.statusKey);

    if (_.isEmpty(status)) {
      return '';
    }

    return status;
  }
}
