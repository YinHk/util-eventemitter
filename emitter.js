
function Emitter () {
    this.events = {};
}

Emitter.prototype.count = function count(e) {
    if (e) return this.events[e].length;
        else return Object.keys(this.events).length;
}

/* function remove(e, cb, events) {
    if (e && cb && events) {  
        if (events[e] !== undefined) {
            for (let i = 0; i<events[e].length; i++) { console.log(events[e][i])
                if (events[e][i].name === 'onceFn' && events[e][i][0] === cb) { 
                    events[e].splice(i, 1);
                    bresk;
                }
            }
            if (events[e].length === 0) delete events[e];
        }
    }
} */

function addCallback(e, cb, once, events) {
    let cbs;
    if (events[e] !== undefined) cbs = events[e]; 
        else cbs = [];
    cbs.push({cb: cb, once: once});
    if (events.e === undefined) Object.assign(events, {[e]: cbs}); 
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
        cbs.forEach(function (item) {
            item.cb(...payload);                
        });
        cbs.forEach(function (item, index, object) {              
            if (item.once) object.splice(index, 1); 
        });
    } else throw new Error(`Listener of event "${e}" doesn't exist`);
}

Emitter.prototype.off = function off(e, cb) {
    if (e && cb) { 
        if (this.events[e]) {
            let cbs = [];
            for (var j =0; j<this.events[e].length; j++) {
                if (cb !== this.events[e][j][cb]) cbs.push(this.events[e][j]);
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
