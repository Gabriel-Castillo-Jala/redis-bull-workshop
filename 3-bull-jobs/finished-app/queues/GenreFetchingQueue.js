import BaseQueue from './BaseQueue.js';
import { QUEUES } from '../constants.js';

const classParams = [
  QUEUES.GENRE_FETCHING_QUEUE.name,
  QUEUES.GENRE_FETCHING_QUEUE.jobName
];

class GenreFetchingQueue extends BaseQueue {
  constructor(queueName, jobName) {
    super(queueName, jobName);
  }
}

const singleton = Object.freeze(new GenreFetchingQueue(...classParams));
export default singleton;
