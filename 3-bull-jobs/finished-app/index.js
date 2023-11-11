import _ from 'lodash';
import http from 'http';

import { MoviesController } from './controllers/index.js';
import './workers/index.js'

const server = http.createServer();

// Create a server object
server.on('request', async (req, res) => {
  const url = req.url;

  if (_.startsWith(url, '/status')) {
    await MoviesController.getStatus(req, res);
  }  else if (_.startsWith(url, '/content')) {
    await MoviesController.getContent(req, res);
  } else if (_.startsWith(url, '/movie')) {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', async () => {
      await MoviesController.getMovies(req, res, body);
    });
  }
});

server.listen(3000, () => {
  console.log("server start at port 3000");
});
