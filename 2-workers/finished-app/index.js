const _ = require('lodash');
const http = require('http');

const { movieController } = require('./controllers');

const server = http.createServer();

// Create a server object
server.on('request', async (req, res) => {
  const url = req.url;

  if (_.startsWith(url, '/status')) {
    await movieController.getStatus(req, res);
  }  else if (_.startsWith(url, '/content')) {
    await movieController.getContent(req, res);
  } else if (_.startsWith(url, '/movie')) {
    let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', async () => {
      await movieController.getMovies(req, res, body);
    });
  }
});

server.listen(3000, () => {
  console.log("server start at port 3000");
});
