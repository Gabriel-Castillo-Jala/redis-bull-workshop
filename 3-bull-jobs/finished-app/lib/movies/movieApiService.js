const Crypto = require('crypto');
const fetch = require('node-fetch');

const movieToken = (() => {
  const value = 'W2hUfzMZW/CDTxpUMe462q9CmYVedTCtH3Nl3yJQ4kr3V3sw5uAgBxlrYnwiQEHURc9/1mAMvRvG2+68UYHVCB/TUtlTBQ0Gqd9vSt9oCeu64krAZM5SFmrNcBpPOZDa9lmST+J+KZ5pJjZ1Pu32pB3qBVMzCcatdovzCD+t14+iu8Wvk4fngGcUH0uFrUbdqEG4kqhBaTBncAOYR8YiRLsuHclIBNmGm+OXzZnq2jiHDFmo0x4/GhO7RDvuopq0YLJo0aXs3B74r56GUl/1qygJwm1nR2eZl+YC2qcblVUnxGQrfnWx0LDfqlqRg3vo';
  const combined = Buffer.from(value, 'base64');
  const iv = Buffer.alloc(16);
  combined.copy(iv, 0, 0, 16);
  const crypted = combined.slice(16).toString('base64');
  const decipher = Crypto.createDecipheriv('aes-256-cbc', Crypto.createHash('sha256').update('YG12sEaaBO3aCK9v', 'utf-8').digest(), iv);
  let decrypted = decipher.update(crypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
})();

class MovieAPIService {
  constructor() {
    this.headers = {
      accept: 'application/json',
      Authorization: `Bearer ${movieToken}`,
    };
  }


  async getGenres() {
    const url = 'https://api.themoviedb.org/3/genre/movie/list';
    const opts = {
      method: 'GET',
      headers: this.headers,
    };

    const res = await fetch(url, opts);

    if (!res.ok) {
      throw new Error('Unable to obtain response from movies api');
    }

    const jsonRes = await res.json();
    return jsonRes.genres;
  }

  async getMoviesByGenres(genres) {
    if (!genres || !Array.isArray(genres) || genres.length <= 0) {
      throw new Error('Need at least a genre to filter');
    }

    const joinedGenres = genres.join(',');

    const opts = {
      method: 'GET',
      headers: this.headers,
    };

    const requests = [];

    for (let page = 1; page < 500; page++) {
      const url = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc&with_genres=${joinedGenres}`;
      requests.push(fetch(url, opts));
    }

    const results = await Promise.all(requests);

    const succeeded = [];
    for (const res of results) {
      if (res.ok) {
        succeeded.push(res.json());
      }
    }

    const jsonResponses = await Promise.all(succeeded);

    const movies = [];
    for (const jsonRes of jsonResponses) {
      movies.push(...jsonRes.results);
    }

    return movies;
  }
}

module.exports.MovieAPIService = MovieAPIService;
