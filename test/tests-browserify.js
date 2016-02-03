(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//var should = require('should');
//var _u= require("../js/utility.js");

describe("should.js Test1", function(){

	var _u = SWEETCHARTS.u;

    before(function(){
        console.log("=============== [TEST START] Utility.js  =============");
    })

    describe('#isMobile', function() {
    	it('should return false when Desktop env.', function() {
    		_u.isMobile().should.be.false;
    	});
    });
    describe('#getRandomIndex', function() {
		var range = 10, size =3;
    	var result = _u.getRandomIndex(range,size);

    	it('should be Array type', function() {
    		result.should.be.instanceof(Array);
    	});

    	it('should be ' + size + ' of array length', function() {
    		result.should.be.length(3);
    	});

    	it('should be less than 10', function() {
    		result.forEach(function(v,i,o) {
    			v.should.be.within(0,10);
    		});
    	})
    });

    describe('#setAttrs', function() {
		var ele = document.querySelector("#dummy");
    	var htData = {'name' : 'jisu', 'sex' : 'man'};

    	var result = _u.setAttrs(ele,htData);
	    var name = ele.getAttribute('name');
	    var sex = ele.getAttribute('sex');

    	it('should get name property after setAttrs call', function() {
    		name.should.be.equal(htData.name);
    		sex.should.be.equal(htData.sex);
    	});
    });

    describe('#getDistanceFromCircleCenter', function() {
    	var htEvt = {'offsetX' : 327, 'offsetY' : 327};
    	var htCore = {'centerX' : 175, 'centerY' : 200};

    	var distance = Math.floor(_u.getDistanceFromCircleCenter(htEvt,htCore));
    	it('should equal distance value when given custom data set', function(){
    		distance.should.be.equal(198);
    	});
    });

    describe('#getPosition', function() {
    	var aAngles = [65.66398176, 142.88396031000002, 314.09991275000004, 352.58390206, 359.9999]; 
    	var htCore = {'radius': 150, 'centerX' : 175, 'centerY' : 200};
    	var i = 1;
    	var fCallback = function(){};
    	var nDistanceFromCenter = 1.6;

    	var htResult = _u.getPosition(aAngles, htCore, i, fCallback, nDistanceFromCenter);

    	it('should equal following value when given custom data set', function(){
    		Math.floor(htResult.x).should.be.approximately(152,2);
    		Math.floor(htResult.y).should.be.approximately(290,2);
    	});
    });
    //todo linkSimpleInherit
});

},{}]},{},[1]);
