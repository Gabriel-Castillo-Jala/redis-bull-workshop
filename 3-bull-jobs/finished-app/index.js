const _ = require('lodash');
const express = require('express');
const Arena = require('bull-arena');
const { Queue } = require('bullmq');
const bodyParser = require('body-parser');

// Raw import to init workers.
require('./workers/index.js');
const { ARENA_CONFIG } = require('./constants.js');
const { MoviesController } = require('./controllers/index.js');

const app = express();
const arena = Arena({ BullMQ: Queue, queues: ARENA_CONFIG });

app.use(bodyParser.json());
app.use('/queues', arena);

app.get('/status', async (req, res) => {
  await MoviesController.getStatus(req, res);
})

app.get('/content', async (req, res) => {
  await MoviesController.getContent(req, res);
})

app.post('/movie', async (req, res) => {
  await MoviesController.getMovies(req, res, req.body);
})

app.listen(3000, () => {
  console.log("server start at port 3000");
});
