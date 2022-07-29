var assert = require('chai').assert
    , expect = require('chai').expect
    , chai = require("chai")
    , sinon = require("sinon")
    , sinonChai = require("sinon-chai")
    , assume = require('assume');

chai.use(sinonChai);

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
    });
});

describe('Emit an event', function () {
    const testFnA = function (cb1) { 
        cb1("Event 'foo' is trigged");
    };
    const testFnB = function (cb2) { 
        cb2("Event 'bar' is trigged");
    };
    var cb1 = sinon.spy();
    var cb2 = sinon.spy();
    e.on("foo", () => testFnA(cb1));
    emitter.on("bar", () => testFnB(cb2));
    e.emit("foo");
    emitter.emit("bar");
    
    it('listeners are being subscribed to events', function () {
        assert.hasAnyKeys(e.events, "foo");
        assert.hasAnyKeys(emitter.self.events, "bar"); 
        assert.lengthOf(Object.keys(e.events["foo"]), 1, "should be 3 listeners");
        assert.lengthOf(Object.keys(emitter.self.events["bar"]), 1, "should be 3 listeners");
    });
    it('callback is being executed when emitting an event', function () {
       expect(cb1).to.have.been.calledWith("Event 'foo' is trigged");
       expect(cb2).to.have.been.calledWith("Event 'bar' is trigged");
    }); 
});

describe('Ensure once emittance only for one time listener', function () {
    var count1 = 0
        , count2 = 0
        , multiple = 0;

    e.once("one", function () {
        count1++;
    });
    /* emitter.once("one", function () {
        count2++;
    }); */
    /* e.on("one", function () {
        multiple++;
    }); */
    /* emitter.on("one", function () {
        multiple++;
    }); */

    e.emit("one");
    e.emit("one");
    e.emit("one");
    //emitter.emit("one");
    //emitter.emit("one");
    //emitter.emit("one");

    it('receive one time emittance only', function () {
        assume(multiple).equals(6);
        //assume(count1).equals(1);
        //assume(count2).equals(1);
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








