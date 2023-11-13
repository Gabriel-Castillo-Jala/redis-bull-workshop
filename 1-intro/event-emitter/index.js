const EventEmitter = require('./eventEmitter');

const loggerEvent = new EventEmitter();

loggerEvent.on('greetings', () => {
  console.log('Hey everyone at the workshop!');
});

loggerEvent.on('greetings', () => {
  console.log('Please be welcome!');
});

loggerEvent.on('farewell', () => {
  console.log('Come back any time!');
});

setTimeout(() => {
  loggerEvent.emit('greetings');
  setTimeout(() => {
    loggerEvent.emit('farewell');
  }, 3000);
}, 2000);
