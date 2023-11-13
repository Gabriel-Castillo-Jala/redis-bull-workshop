import { log } from 'console-log-colors';
export default class QueueEventListener {
  constructor(QueueListenerInstance) {
    this.queue = QueueListenerInstance;
  }

  listen() {
    this.queue.on('added',     async ({ jobId }) => this._onAdd(jobId));
    this.queue.on('progress',  async ({ jobId, data }) => this._onProgress(jobId, data));
    this.queue.on('failed',    async ({ jobId }) => this._onFailed(jobId));
    this.queue.on('completed', async ({jobId }) => this._onCompleted(jobId));
  }

  async _onAdd(jobId) {
    log.cyan(`Job #${jobId} has started.`);
  };

  async _onProgress(jobId, data) {
    log.yellow(`Job #${jobId} progress: ${data}%.`);
  };

  async _onCompleted(jobId) {
    log.green(`Job #${jobId} has been completed.`);
  };

  async _onFailed(jobId) {
    log.red(`Job #${jobId} has failed to complete.`);
  };
}
