var assert = require('chai').assert;
var expect = require('chai').expect;
//var assert = require('assert');
var { emitter } = require('../index');
var Emitter = require('../emitter');

describe('Subscribe listerner to an event', function () {
    
    var e = new Emitter(); 
    //console.log(e.events['hi'])
    e.on("tt", function () {});
    //emitter.on('test2', function () {});
    

    /* afterEach(function () {
       e.off('test1', function () {});
       emitter.off('test1', function () {});
    }); */

    it('a listener is being subscribed to event', function () {
        assert.lengthOf(e.events, 1, 'has one event being subscribed');
        //assert.lengthOf(emitter.events, 1, 'has one event being subscribed');
    });
});

