# util-eventemitter
A helpful, efficient and lightweight util - event emitter.

[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/mui-org/material-ui/blob/master/LICENSE)
## Install
```
npm i util-eventemitter
```
or
```
npm i util-eventemitter --save
```

## Usage
```js
var { Emitter } = require('util-eventemitter');
var em = new Emitter(); 

var callbackFn = function () {};

//listener
em.on('foo', callbackFn);
em.addEventListener('foo', callbackFn);

//one time listener
em.once('bar', callbackFn);
em.addOneTimeListener('bar', callbackFn);

//emit
em.emit('foo', ...arg);

//remove listener
em.off('bar', callbackFn);
em.removeListener('bar', callbackFn);

//clear all listeners 
em.removeAll();
em.removeAllListeners();

//check number of existing events
em.count();

//check number of listeners under the specific event
em.count('event name');
```
Alternatively, you can using `emitter` directly as imported module without initialization, as it is initialized. 
```js
var { emitter } = require('util-eventemitter');

//no need to initialize, use it directly same as above

```

## Method
### on(event, fn) , addEventListener(event, fn)
- `event` - the name of the event
- `fn` - a callback function to trigger when event is emitted(listener)

### once(event, fn) , addOneTimeListener(event, fn)
- `event` - the name of the event
- `fn` - a callback function to trigger when event is emitted
> This listener only trigger listener only once

### emit(event[, ...payload])
- `event` - the name of the event
- `...payload`[optional] - a series of arguements pass to the listener

### off(event[, fn]) , removeListener(event[, fn])
- `event` - the name of the event
- `fn` - a listener

### removeAll() , removeAllListeners()

### count(event)
- `event`[optional] - the name of the event
> If event is skipped, returns number of events, otherwise it returns number of existing listeners for specific event

## Tests [![Build Status](https://travis-ci.org/medikoo/event-emitter.png)](https://travis-ci.org/medikoo/event-emitter)
```
npm install
npm test
```
## Build
```
npm install
npm run build
```

## License
[MIT](LICENSE)
