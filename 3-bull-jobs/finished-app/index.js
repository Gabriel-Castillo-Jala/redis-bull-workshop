const express = require('express');
const Arena = require('bull-arena');
const { Queue } = require('bullmq');
const bodyParser = require('body-parser');

// Raw import to init workers.
require('./workers');
const { ARENA_CONFIG } = require('./constants');
const { movieController } = require('./controllers');

const app = express();
const arena = Arena({ BullMQ: Queue, queues: ARENA_CONFIG });

app.use(bodyParser.json());
app.use('/queues', arena);

app.get('/status', async (req, res) => {
  await movieController.getStatus(req, res);
})

app.get('/content', async (req, res) => {
  await movieController.getContent(req, res);
})

app.post('/movie', async (req, res) => {
  await movieController.getMovies(req, res, req.body);
})

app.listen(3000, () => {
  console.log("server start at port 3000");
});
