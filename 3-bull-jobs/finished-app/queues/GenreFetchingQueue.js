const { BaseQueue } = require('./BaseQueue.js');
const { QUEUES } = require('../constants.js');

const classParams = [
  QUEUES.GENRE_FETCHING_QUEUE.name,
  QUEUES.GENRE_FETCHING_QUEUE.jobName
];
class GenreFetchingQueue extends BaseQueue {
  constructor(queueName, jobName) {
    super(queueName, jobName);
  }
}

module.exports.GenreFetchingQueue = Object.freeze(new GenreFetchingQueue(...classParams));
