# util-eventemitter
A helpful, efficient and lightweight util - event emitter.

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


