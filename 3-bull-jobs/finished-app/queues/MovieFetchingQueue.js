import BaseQueue from './BaseQueue.js';
import { QUEUES } from '../constants.js';

const classParams = [
  QUEUES.MOVIE_FETCHING_QUEUE.name,
  QUEUES.MOVIE_FETCHING_QUEUE.jobName
];

class MovieFetchingQueue extends BaseQueue {
  constructor(queueName, jobName) {
    super(queueName, jobName);
  }
}

const singleton = Object.freeze(new MovieFetchingQueue(...classParams));
export default singleton;
