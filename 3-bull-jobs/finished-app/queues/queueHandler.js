export default class QueueListener {
  constructor(queueInstance) {
    this.queue = queueInstance;
  }

  listen() {
    this.queue.on('drained',   async () => this._onDrained());
    this.queue.on('start',     async ({ jobId }) => this._onStart(jobId));
    this.queue.on('progress',  async ({ jobId }) => this._onProgress(jobId));
    this.queue.on('waiting',   async ({ jobId }) => this._onWaiting(jobId));
    this.queue.on('failed',    async ({ jobId }) => this._onFailed(jobId));
    this.queue.on('completed', async ({ jobId, remove }) => await this._onCompleted(jobId, remove));
  }

  async _onStart(jobId) {
    console.log(`Job #${jobId} has been started.`);
  };

  async _onProgress(jobId) {
    console.log(`Job #${jobId} is in progress.`);
  };

  async _onWaiting(jobId) {
    console.log(`Job #${jobId} is waiting to be started.`);
  };

  async _onCompleted(jobId, remove) {
    console.log(`Job #${jobId} is has been completed.`);
    await remove();
  };
  async _onDrained() {
    console.log('Queue has been drained and there are no more jobs left.');
  };

  async _onFailed(jobId) {
    console.err(`Job #${jobId} has failed to complete.`);
  };
}
