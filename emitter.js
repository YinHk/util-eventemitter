
function Emitter () {
    this.events = {};
}

Emitter.prototype.count = function count(e) {
    if (e) return this.events[e].length;
        else return Object.keys(this.events).length;
}

function addCallback(e, cb, once, events) {
    if (events.e) cbs = events.e;
        else 
    //let cbs = Object.assign(e, {'event': []})
    if (!cbs) cbs = [];
    if (once)  {
        function onceListener (...payload) {
            this.off(e, cb);
            cb(...payload);
        }
        cbs.push(onceListener);
    } else cbs.push(cb);
    this.events[e] = cbs;
    cbs = null;
}

Emitter.prototype.on = function on(e, cb) {
    if (e && cb) {
        if(typeof cb == 'function') addCallback(e, cb, false, this.events);
            else throw new TypeError(`You add a listener as a type of ${typeof cb}, the type should be a function`);
    }
    return this;
} 

Emitter.prototype.once = function once(e, cb) {
    if (e && cb) {
        if(typeof cb == 'function') addCallback(e, cb, true, this.events); 
    }
    return this;
}

Emitter.prototype.emit = function emit(e, ...payload) {
    let cbs = this.events[e];
    if (cbs) {
        cbs.forEach(function (cb) {
            cb(...payload);
        });
    } else throw new Error(`Listener of event "${e}" doesn't exist`);
}

Emitter.prototype.off = function off(e, cb) {
    if (e && cb) {
        if (this.events[e]) {
            let cbs = [];
            for (var j =0; j<this.events[e].length; j++) {
                if (cb !== this.events[e][j]) cbs.push(this.events[e][j]);
            }
            this.events[e] = cbs;
            if (this.count(e) === 0) delete this.events[e];
            cbs = null;
        } else throw new Error(`Event "${e}" or listener doesn't exist, can't remove listener`);
    } 
    return this;
}

Emitter.prototype.removeAll = function removeAll() {
    if (this.count !== 0) this.events = {};
    return this;
}

Emitter.prototype.addEventListener = Emitter.prototype.on;
Emitter.prototype.addOneTimeListener = Emitter.prototype.once;
Emitter.prototype.removeListener = Emitter.prototype.off;
Emitter.prototype.removeAllListeners = Emitter.prototype.removeAll;

module.exports = Emitter;