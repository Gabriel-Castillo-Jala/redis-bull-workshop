import BaseQueue from './BaseQueue.js';
import { QUEUES } from '../constants.js';

const classParams = [
  QUEUES.MOVIE_MAILING_QUEUE.name,
  QUEUES.MOVIE_MAILING_QUEUE.jobName
];

class MovieMailingQueue extends BaseQueue {
  constructor(queueName, jobName) {
    super(queueName, jobName);
  }
}

const singleton = Object.freeze(new MovieMailingQueue(...classParams));
export default singleton;
