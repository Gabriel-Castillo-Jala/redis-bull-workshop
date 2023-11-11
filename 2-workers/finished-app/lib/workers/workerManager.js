const { Worker, isMainThread } = require('worker_threads');

class WorkerManager {
    constructor(numWorkers) {
    this.numWorkers = numWorkers;
  }

  distributeTasks(start, end, opts) {
    if (isMainThread) {
      const pageSize = (end - start + 1) / this.numWorkers;
      const workerPromises = [];

      for (let i = 0; i < this.numWorkers; i++) {
        const workerStart = Math.floor(i * pageSize) + start;
        const workerEnd = Math.floor((i + 1) * pageSize) + start - 1;
        let worker = null;
        try {
          worker = new Worker('./lib/workers/worker.js', {
          workerData: { start: workerStart, end: workerEnd, opts },
        });
        } catch (error) {
          console.error(error);
      }
       

        workerPromises.push(
          new Promise((resolve) => {
            worker.on('message', (result) => {
              resolve(result);
            });
          })
        );
      }

      return Promise.all(workerPromises);
    } else {
      throw new Error('WorkerManager should only be used in the main thread.');
    }
  }
}

module.exports = WorkerManager;
