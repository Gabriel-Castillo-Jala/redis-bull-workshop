const MovieHelper = require('../lib/movies/movieHelper.js');

class MovieController {
  constructor() {
    this.helper = new MovieHelper();
  }

  async getStatus(req, res) {
    const status = await this.helper.getCurrentMovieStatus();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(`{ "status": "${status}" }`);
    res.end();
  }

  async getContent(req, res) {
    try {
      const movies = await this.helper.getLoadedMovies();
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(movies));
      res.end();
    } catch(err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.write(`{ error: ${err.message} }`);
      res.end();
    }
  }

  async getMovies(req, res, body) {
    try {
      const reqBody = JSON.parse(body);
      await this.helper.filterMoviesByGenre(reqBody.genres);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write('{ "success": true, "status": "Movies loaded" }');
      res.end();
    } catch(err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.write(`{ error: ${err.message} }`);
      res.end();
    }
  }
}

module.exports = MovieController;
