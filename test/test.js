var assert = require('chai').assert;
var expect = require('chai').expect;

var { emitter, Emitter }  = require('../index');

var e = new Emitter(); 

describe('Subscribe a listerner to an event', function () {
    e.on("test1", function () {});
    emitter.on('test1', function () {});

    it('a listener is being subscribed to an event', function () {
        assert.hasAnyKeys(e.events, "test1");
        assert.hasAnyKeys(emitter.self.events, "test1");
        assert.lengthOf(Object.keys(e.events["test1"]), 1, "should be 1 listener only");
        assert.lengthOf(Object.keys(emitter.self.events["test1"]), 1, "should be 1 listener only");
            
    });
});

describe('Subscribe one time listerner to an event', function () {
    e.once("test2", function () {});
    emitter.once('test2', function () {});

    it('a one time listener is being subscribed to an event', function () {
        assert.hasAnyKeys(e.events, "test2");
        assert.hasAnyKeys(emitter.self.events, "test2");
        assert.lengthOf(Object.keys(e.events["test2"]), 1, "should be 1 listener only");
        assert.lengthOf(Object.keys(emitter.self.events["test2"]), 1, "should be 1 listener only");
        e.off('test2', function () {});
        emitter.off('test2', function () {});
    });
});

describe('Remove a listener / unsubscribe to an event', function () {
    const testFn = function () {};
    e.on("test3", testFn);
    emitter.on('test3', testFn);

    it('a listener is being subscribed to an event', function () {
        assert.hasAnyKeys(e.events, "test3");
        assert.hasAnyKeys(emitter.self.events, "test3");
        assert.lengthOf(Object.keys(e.events["test3"]), 1, "should be 1 listener only");
        assert.lengthOf(Object.keys(emitter.self.events["test3"]), 1, "should be 1 listener only");
    });
    it('a listener is being removed', function () {
        e.off("test3", testFn);
        emitter.off('test3', testFn);
        expect(e.events).to.not.have.property("test3");
        expect(emitter.self.events).to.not.have.property("test3");
    });

});
   
describe('Remove all listener', function () {
    const testFnOne = function () {};
    e.on("event A", testFnOne);
    emitter.on('event B', testFnOne);

    const testFnTwo = function () {};
    e.on("event A", testFnTwo);
    emitter.on('event B', testFnTwo);

    const testFnThree = function () {};
    e.on("event A", testFnThree);
    emitter.on('event B', testFnThree);

    it('listeners are being subscribed to events', function () {
        assert.hasAnyKeys(e.events, "event A");
        assert.hasAnyKeys(emitter.self.events, "event B"); 
        assert.lengthOf(Object.keys(e.events["event A"]), 3, "should be 3 listeners");
        assert.lengthOf(Object.keys(emitter.self.events["event B"]), 3, "should be 3 listeners");
    });
    it('all listener are being removed', function () {
        e.removeAll();
        emitter.removeAll();
        expect(Object.keys(e.events)).to.be.empty;
        expect(Object.keys(emitter.self.events)).to.be.empty;
    });
});




