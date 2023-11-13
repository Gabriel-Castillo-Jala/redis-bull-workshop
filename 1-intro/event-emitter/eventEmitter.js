class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event] || this.events instanceof Array) {
      this.events[event] = [];
    }

    this.events[event].push(listener);
  }

  emit(event) {
    if (!this.events[event] || this.events instanceof Array) {
      return;
    }

    this.events[event].forEach((listener) => {
      listener.call(this);
    })
  }
}

module.exports = EventEmitter;
