const { BaseQueue } =  require('./BaseQueue');
const { QUEUES } =  require('../constants');

const classParams = [
  QUEUES.MOVIE_SORTING_QUEUE.name,
  QUEUES.MOVIE_SORTING_QUEUE.jobName
];

class MovieSortingQueue extends BaseQueue {
  constructor(queueName, jobName) {
    super(queueName, jobName);
  }
}

module.exports.MovieSortingQueue = Object.freeze(new MovieSortingQueue(...classParams));
