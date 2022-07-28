
function Emitter () {
    this.listeners = {};
    //this.count = this.listeners.length;
}

Emitter.prototype.countListener = function countListener() {
    return this.listeners.length;
}

function addCallback(e, cb) {
    let cbs = this.listeners[e];
    if(countListener !== 0) cbs.push(cb);
        else cbs[0] = cb;
    this.listener[e] = cbs;
    cbs = null;
}

Emitter.prototype.on = function on(e, cb) {
    if(cb) {
        if(typeof cb == 'function') addCallback(e, cb);
            else throw new TypeError(`You add a listener as a type of ${typeof cb}, the type should be a function`);
    } 
} 

Emitter.prototype.once = function once(e, cb) {
    if(cb) {
        if(typeof cb == 'function') addCallback(e, cb); 
    }
}

