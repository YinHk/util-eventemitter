# util-eventemitter
A lightweight util - event emitter using in your JS project.

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
var emitter = new Emitter(); 

var callbackFn = function () {};

//listener
emitter.on('foo', callbackFn);

//one time listener
emitter.once('bar', callbackFn);

//emit
emitter.emit('foo', ...arg);

//remove listener
emitter.off('bar', callbackFn);

//clear all listeners 
emitter.removeAll();

//check number of existing events
emitter.count();

//check number of listeners under the specific event
emitter.count('event name');
```


