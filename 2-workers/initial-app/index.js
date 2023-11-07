const http = require('http');

const { movieController } = require('./controllers');

const server = http.createServer();

// Create a server object
server.on('request', async (req, res) => {
  const url = req.url;

  if (url === '/status') {
    await movieController.getStatus(req, res);
  } else {
    res.write('Nothing here!');
    res.end();
  }
});

server.listen(3000, () => {
  console.log("server start at port 3000");
});
