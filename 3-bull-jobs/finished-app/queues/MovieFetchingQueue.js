const { BaseQueue } = require('./BaseQueue.js');
const { QUEUES } = require('../constants.js');

const classParams = [
  QUEUES.MOVIE_FETCHING_QUEUE.name,
  QUEUES.MOVIE_FETCHING_QUEUE.jobName
];

class MovieFetchingQueue extends BaseQueue {
  constructor(queueName, jobName) {
    super(queueName, jobName);
  }
}

module.exports.MovieFetchingQueue = Object.freeze(new MovieFetchingQueue(...classParams));
