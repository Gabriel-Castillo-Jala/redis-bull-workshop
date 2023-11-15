const _ = require('lodash');

const redisManager = require('./redisManager');

const runQueue = async (queue) => {
  if (_.isEmpty(queue)) {
    return;
  }

  console.log(`Running: ${queue.queueNumber}`);
  console.log(`Message: ${queue.message}`);
  console.log(`End of: ${queue.queueNumber}`);
};

(async () => {
  while(true) {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 5000);
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
      }, 5000);
    });

    await runQueue(await redisManager.popLifoQueue());
  }
})().then(() => {}).catch((err) => {
  console.log(err);
});
