import BaseQueue from './BaseQueue.js';
import { QUEUES } from '../constants.js';

const classParams = [
  QUEUES.MOVIE_SORTING_QUEUE.name,
  QUEUES.MOVIE_SORTING_QUEUE.jobName
];

class MovieSortingQueue extends BaseQueue {
  constructor(queueName, jobName) {
    super(queueName, jobName);
  }
}

const singleton = Object.freeze(new MovieSortingQueue(...classParams));
export default singleton;
