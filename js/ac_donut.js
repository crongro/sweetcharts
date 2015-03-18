var Donut = (function(ANICHART_PIE) {

    var FXDATA = {
      xmlns               : "http://www.w3.org/2000/svg",
    };

	var Donut = function() {
	    var aArg = [].slice.call(arguments);
	    //aArg.shift();
        this.bDonutChart = true;
	    ANICHART_PIE.apply(this,aArg);
	};

	Donut = _u.linkSimpleInherit(Donut ,ANICHART_PIE);

    //Methods for Donut
    Donut.prototype.makeDonut = function() {
    	//calculate halfPosition
    	var aHalfPosition = this.calculateHalfPosition();
    	this.createPathElements(aHalfPosition);
    };

    Donut.prototype.makeCircle = function() {
       var g = document.createElementNS(FXDATA.xmlns, "g");
       this.elChartSVG.appendChild(g);
       c = document.createElementNS(FXDATA.xmlns, "circle");
       _u.setAttrs(c, {
          "id"    : "donutCircle",
          "style" : "fill:#fff",
          "cx"    : this.htCore.centerX,
          "cy"    : this.htCore.centerY,
          "r"     : this.htCore.radius/2
       });
       g.appendChild(c);
    };

    Donut.prototype.calculateHalfPosition = function() {
    	var _aHalfPOS = [];
    	this.aELHalfPath = [];

    	for(var i = 0 ; i < this._aStart.length; i++) {
	    	var _data = {};
    		var c = (this._aStart[i].y - this.htCore.centerY);
    		var p = (this._aStart[i].x - this.htCore.centerX);
    		var a = Math.abs(c / p);

    		var nXdirection = (p > 0) ? 1 : -1;
    		var nYdirection = (c > 0) ? 1 : -1;

    		var _nHalfX = this.htCore.radius / (2 * Math.sqrt((1+(a*a))));

    		var nHalfX = this.htCore.centerX + (nXdirection* _nHalfX);
    		var nHalfY = this.htCore.centerY + (nYdirection * _nHalfX * a);

    		_data["startX"] = nHalfX;
    		_data["startY"] = nHalfY;
    		_data["radius"] = this.htCore.radius / 2;
    		_data["centerX"] = this.htCore.centerX;
    		_data["centerY"] = this.htCore.centerY;

    		_aHalfPOS.push(_data);
    	}

    	return _aHalfPOS;
    };

    Donut.prototype.createPathElements = function(_aHalfPOS) {

    	for(var i = 0 ; i < _aHalfPOS.length ; i++) {
    		var _d = _aHalfPOS[i];

    		var _endX = (i == (_aHalfPOS.length-1)) ? _aHalfPOS[0].startX : _aHalfPOS[i+1].startX;
    		var _endY = (i == (_aHalfPOS.length-1)) ? _aHalfPOS[0].startY : _aHalfPOS[i+1].startY;

			var sCoords = this._getCoordProperty(_d.startX,_d.startY,_endX, _endY, _d.radius, _d.centerX, _d.centerY);
            this._createPathElements(this.aELHalfPath, i, sCoords, "#fff",true);
    	}
    };

	return Donut;

}(ANICHART_PIE));

if (typeof define === "function" && define.amd) {
	    define(["ac_pie"], function() {
	        return Donut;
	});
}