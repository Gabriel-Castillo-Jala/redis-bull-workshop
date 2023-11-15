const _ = require('lodash');

const redisManager = require('./redisManager');

const runQueue = async (queue) => {
  if (_.isEmpty(queue)) {
    return;
  }

  console.log(`Running: ${queue.queueNumber}`);
  console.log(`Message: ${queue.message}\n`)
};

(async () => {
  while(true) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });

    await runQueue(await redisManager.popFifoQueue());
  }
})().then(() => {}).catch((err) => {
  console.log(err);
});

(async () => {
  while(true) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });

    await runQueue(await redisManager.popLifoQueue());
  }
})().then(() => {}).catch((err) => {
  console.log(err);
});
