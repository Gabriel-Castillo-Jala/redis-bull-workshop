import { Queue } from 'bullmq';
import { redis } from '../data/redis.js';

export default class BaseQueue {
  #queue;
  #jobName;
  queueName;
  #defaultOpts = {
    attempts: 5,
    backoff: { type: 'exponential', delay: 3000 },
  }


  constructor(queueName, jobName, opts = {}) {
    this.#jobName = jobName;
    this.queueName = queueName;
    this.#queue = new Queue(
      queueName,
      {
        connection: redis,
        defaultJobOptions: this.#defaultOpts,
        ...opts
      }
    );
  }

  async enqueue(context, opts = {}) {
    await this.#queue.add(this.#jobName, context, opts);
  }

  async remove (jobId, opts = {}) {
    await this.#queue.remove(jobId, opts);
  }

  async close() {
    await this.#queue.close();
  }

  async retryJobs() {
    await this.#queue.retryJobs();
  }

  async pause() {
    await this.#queue.pause();
  }

  async drain() {
    await this.#queue.drain();
  }
}
