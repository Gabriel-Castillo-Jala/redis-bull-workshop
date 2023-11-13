import _ from 'lodash';
import express from 'express';
import Arena from 'bull-arena';
import { Queue } from 'bullmq';
import bodyParser from 'body-parser';

import './workers/index.js'
import { ARENA_CONFIG } from './constants.js';
import { MoviesController } from './controllers/index.js';

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
