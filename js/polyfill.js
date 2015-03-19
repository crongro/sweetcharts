/**
 * 
 * ANICHART.JS. Polyfill Utility 
 * 
 * MIT license
 * @author [nigayo]
 * Send me an email : aniga75@gmail.com
 */

"use strict";
/*global window: false */ 

//set namespace
var _ANICHART = {};

_ANICHART.polyfill = {
    exec : function() {
        for(var method in this) {
           if(method === "exec") continue;
           if(this.hasOwnProperty(method) && (typeof this[method] === "function")) {
              this[method].call(null);
           }
       }
    },
    //reference : https://gist.github.com/paulirish/1579671
    animationFrame : function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
        };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
              window.clearTimeout(id);
            };
    },
};
