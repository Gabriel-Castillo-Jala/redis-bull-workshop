const _ = require('lodash');
const http = require('http');

const server = http.createServer();
const redisManager = require('./redisManager');

const route = async (req, res, body) => {
  if (_.startsWith(req.url, '/fifo')) {
    await redisManager.addToFifoQueue(body);
  }  else if (_.startsWith(req.url, '/lifo')) {
    await redisManager.addToLifoQueue(body);
  }

  res.write(JSON.stringify({ success: 'Queue added'}));
  res.end();
};

// Create a server object
server.on('request', async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  let body = '';

    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', async () => {
      const reqBody = JSON.parse(body);
      await route(req, res, reqBody);
    });
});

module.exports = server;
