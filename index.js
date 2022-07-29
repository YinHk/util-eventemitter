var Emitter = require('./emitter.js');

const eventEmitter = new Emitter();

module.exports = {
    emitter: {
        self: eventEmitter,
        on: (event, fn) => eventEmitter.on(event, fn),
        addEventListener: (event, fn) => eventEmitter.on(event, fn),
        once: (event, fn) => eventEmitter.once(event, fn),
        addOneTimeListener: (event, fn) => eventEmitter.once(event, fn),
        off: (event, fn) => eventEmitter.off(event, fn),
        removeListener: (event, fn) => eventEmitter.off(event, fn),
        removeAll: () => eventEmitter.removeAll(),
        removeAllListeners: () => eventEmitter.removeAll(),
        emit: (event, ...payload) => eventEmitter.emit(event, ...payload),
        count: (event) => eventEmitter.count(event),
    },
    Emitter: Emitter
};
