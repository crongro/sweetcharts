/**
 * 
 * SWEETCHARTS.Donut-Chart 
 * 
 * MIT license
 * @author [nigayo]
 * Send me an email : aniga75@gmail.com
 */
 
"use strict";
SWEETCHARTS.Donut = (function(PIE, u, window, document) {

    var FXDATA = {
      xmlns: "http://www.w3.org/2000/svg",
    };

	var Donut = function() {
	    var aArg = [].slice.call(arguments);
        this.bDonutChart = true;
        this.elCenterText = null;
	    PIE.apply(this,aArg);
	};

	Donut = u.linkSimpleInherit(Donut ,PIE);

    //Methods for Donut
    Donut.prototype.execDonutAfterProcess = function() {
    	//calculate halfPosition
    	var aHalfPosition = this.calculateHalfPosition();
    	this.createInnerPathElements(aHalfPosition);

        this.makeCenterTextElement();
    };

    Donut.prototype.makeCenterTextElement = function() {
        var r = this.htCore.radius;
        var g = document.createElementNS(FXDATA.xmlns, "g");
        var t = document.createElementNS(FXDATA.xmlns, "text");


        var nIndex = +this.elMaxValuePath.getAttribute('class').substring(6);
        var sMaxPathKey = this.aPieceKeys[nIndex];

        var sFontSize = r / (sMaxPathKey.length+1); //2 is adjustment for properly fontsize(little minification)

        u.setAttrs(t, {
            "class"     : "centerMessage",
            "fill"      : "gray",
            "font-size" : sFontSize+"",
        });

        this.elChartSVG.appendChild(g);
        g.appendChild(t);

        this.elCenterText = t;
        this.changeCenterTextMessage(sMaxPathKey);
    };

    Donut.prototype.changeCenterTextMessage = function(sMessage) {
            this.elCenterText.textContent = sMessage;
            var xPos = this.htCore.centerX - this.elCenterText.getBBox().width/2;
            if(!this.yPos) this.yPos = this.htCore.centerY + this.elCenterText.getBBox().height/3; //3 is adjustment value for a text Y position.
            u.setAttrs(this.elCenterText, {"transform" : "translate(" + xPos + " " + this.yPos + ")", });
    };

    Donut.prototype.makeCircle = function() {
       var g = document.createElementNS(FXDATA.xmlns, "g");
       var c = document.createElementNS(FXDATA.xmlns, "circle");
       this.elChartSVG.appendChild(g);
       u.setAttrs(c, {
          "class"    : "donutCircle",
          "style" : "fill:#fff",
          "cx"    : this.htCore.centerX,
          "cy"    : this.htCore.centerY,
          "r"     : this.htCore.radius/2
       });
       g.appendChild(c);
    };

    Donut.prototype.calculateHalfPosition = function() {
    	var aHalfPOS = [];
    	this.aELHalfPath = [];

    	for(var i = 0 ; i < this.aStart.length; i++) {
	    	var data = {};
    		var c = (this.aStart[i].y - this.htCore.centerY);
    		var p = (this.aStart[i].x - this.htCore.centerX);
    		var a = Math.abs(c / p);

    		var nXdirection = (p > 0) ? 1 : -1;
    		var nYdirection = (c > 0) ? 1 : -1;

    		var _nHalfX = this.htCore.radius / (2 * Math.sqrt((1+(a*a))));

    		var nHalfX = this.htCore.centerX + (nXdirection * _nHalfX);
    		var nHalfY = this.htCore.centerY + (nYdirection * _nHalfX * a);

    		data["startX"] = nHalfX;
    		data["startY"] = nHalfY;
    		data["radius"] = this.htCore.radius / 2;
    		data["centerX"] = this.htCore.centerX;
    		data["centerY"] = this.htCore.centerY;

    		aHalfPOS.push(data);
    	}

    	return aHalfPOS;
    };

    Donut.prototype.createInnerPathElements = function(aHalfPOS) {

    	for(var i = 0 ; i < aHalfPOS.length ; i++) {
    		var d = aHalfPOS[i];

    		var endX = (i == (aHalfPOS.length-1)) ? aHalfPOS[0].startX : aHalfPOS[i+1].startX;
    		var endY = (i == (aHalfPOS.length-1)) ? aHalfPOS[0].startY : aHalfPOS[i+1].startY;

			var sCoords = this.getCoordProperty(d.startX,d.startY,endX, endY, d.radius, d.centerX, d.centerY);
            this.createPathElements(this.aELHalfPath, i, sCoords, "#fff",true);
    	}
    };

	return Donut;

}(SWEETCHARTS.PIE, SWEETCHARTS.u, window, document));

if (typeof define === "function" && define.amd) {
	    define(["sweet_donut"], function() {
	        return SWEETCHARTS.Donut;
	});
}