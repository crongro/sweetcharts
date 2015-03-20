/**
 * 
 * SWEETCHARTS Utility
 * 
 * MIT license
 * @author [nigayo]
 * Send me an email : aniga75@gmail.com
 */
 
"use strict";
SWEETCHARTS.u = {
    setAttrs : function(elBase, htData) {
        for(var sKey in htData) {
            if(htData.hasOwnProperty(sKey)) {
                elBase.setAttribute(sKey, htData[sKey]);
            }
        }
    },
    getDistanceFromCircleCenter : function(e, htCore) {
        var x = (e.offsetX) ? e.offsetX : (e.layerX - (e.target.parentElement.offsetLeft));
        var y = (e.offsetY) ? e.offsetY : (e.layerY - (e.target.parentElement.offsetTop));
        var nDistance = Math.sqrt(Math.pow(htCore.centerX - x, 2) + Math.pow(htCore.centerY - y, 2));
        return nDistance;
    },
    getRandomIndex : function(nRandomRange, nNeedCount) {
      var arr = [];
      while(arr.length < nNeedCount) {
        var ranValue = Math.round(Math.random() * nRandomRange);
        if(arr.length > nRandomRange) arr.push(ranValue);
        else if(arr.indexOf(ranValue) < 0) arr.push(ranValue);
        else continue;
      }
      return arr;
    },
    getPosition : function(aAngles,htCore, i, fCallback, nDistanceFromCenter) {
        var ta;
        var caledPy = 0.01745329251; // (Math.PI / 180)
        var r = htCore.radius;
        var cx = htCore.centerX;
        var cy = htCore.centerY;
        nDistanceFromCenter = nDistanceFromCenter || 1.6;

        //calculate center angle (ta)
        if(i === 0 ) ta = Math.round(aAngles[0]/2);
        else ta = Math.round((aAngles[i] - aAngles[i-1])/2 + aAngles[i-1]);

        //set x,y position to the circle center
        var tx = (Math.cos(caledPy * ta)) * r;
        var ty = (Math.sin(caledPy * ta)) * r;

        fCallback(tx, ty, i);

        //set x,y position to the SVG Element
        tx = cx + (tx/nDistanceFromCenter); // the smaller the value away from the center point.
        ty = cy + (ty/nDistanceFromCenter);

        return { "x" : tx, "y" : ty};
    },
    linkSimpleInherit : function(fnChild, fnParent) {
        fnChild.prototype = Object.create(fnParent.prototype);
        fnChild.prototype.constructor = fnChild;
        return fnChild;
    }
};