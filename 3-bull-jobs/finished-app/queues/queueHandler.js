const { log } = require('console-log-colors');
class QueueEventHandler {
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

  async _onProgress(jobId, { part, completion, job }) {
    log.yellow([
      `Job #${jobId}`,
      `has finished processing part ${part}:`,
      `"${job}".`,
      `Completion is: ${completion}%.`
    ].join(' '));
  };

  async _onCompleted(jobId) {
    log.green(`Job #${jobId} has been completed.`);
  };

  async _onFailed(jobId) {
    log.red(`Job #${jobId} has failed to complete.`);
  };
}

module.exports.QueueEventHandler = QueueEventHandler;
