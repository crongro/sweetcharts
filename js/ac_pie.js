/**
 * ANICHART.JS. PIE-CHART
 * @author [nigayo]
 */
var ANICHART_PIE = (function() {

  var FXDATA = {
      minPieceCount       : 2,
      nAniTime            : 16,
      xmlns               : "http://www.w3.org/2000/svg",
      maxAngle            : 359.9999,
      sErrorMSG           : {
            OPTION_TYPE_ERROR : "option type is wrong",
            REQ_PIECE_DATA    : "Require pie's piece datas",
            SUM_ERROR         : "the sum of pieceData should be 100"
      },
      htDefaultCoreValue  : {
            centerX:100, centerY:100, radius:50, nMaxAngle:360, nMilliSecondCycle : 1000, nIncrease:5
      },
      CSS : {
        chartShadow : "drop-shadow(4px 5px 2.2px rgba(0,0,0,0.25))"
      }
  };

  function PIE(elTarget, htOption) {
      if(!(htOption && typeof htOption === "object")) {
          if(window.console) console.error(FXDATA.sErrorMSG.OPTION_TYPE_ERROR);
          return null;
       }
      this.nCount = 0;

      this.aElPath = [];
      this._aArc = [];
      this._aStart = [];

      this.elParentSVG = elTarget;
      this.htCore = {};
      this.aPiece = [];

      //set options
      try {this._setOption(htOption);} catch(errMsg){console.error(errMsg);}

      //set center position
      this.htCore.startX = this.htCore.centerX + this.htCore.radius;
      this.htCore.startY = this.htCore.centerY;

      this._makeCreatePathElement();
  }


  PIE.prototype = {
    _setOption : function(htOption) {

        var htCoreOption  = htOption.core;
        this.aPiece        = htOption.piece;

        //check. piece count
        if(this.aPiece.length < FXDATA.minPieceCount) throw Error(FXDATA.sErrorMSG.REQ_PIECE_DATA);

        //piece option recalculate : to % ratio
        var _nSumPiece = this.aPiece.reduce(function(pre,now,i,o){
          if(typeof pre!== "number") pre = +pre[0]; 
          return pre + now[0];
        });
        this.aPiece.forEach(function(v,i,o) {
          this.aPiece[i][0] = +((v[0]/_nSumPiece)*100).toFixed(2);
        }.bind(this));

        for(var name in FXDATA.htDefaultCoreValue) {
          this.htCore[name] = htCoreOption[name] || FXDATA.htDefaultCoreValue[name];
        }

        //100 is piece animation time(adjusted value)
        this.htCore.nIncrease = (FXDATA.nAniTime * 360) / (htCoreOption.nMilliSecondCycle - 100);
     },

    _createPathElements : function (nIndex) {
        //var _elParent = document.querySelector("#pieWrap > svg");

        var g = document.createElementNS(FXDATA.xmlns, "g");
        this.elParentSVG.appendChild(g);

        this.aElPath[nIndex] = document.createElementNS(FXDATA.xmlns, "path");

        var _coords = this._getCoordProperty();

        this.aElPath[nIndex].setAttribute("id" , "elPath");
        this.aElPath[nIndex].setAttribute("d" , _coords);
        this.aElPath[nIndex].setAttribute("style" , "stroke:white;fill:"+this.aPiece[nIndex][1]);
        //this.elParentSVG.appendChild(this.aElPath[nIndex]);
        g.appendChild(this.aElPath[nIndex]);

      },

    _getCoordProperty : function() {
      var _result = "M" + this.htCore.startX + " " + this.htCore.startY + " "+ 
                    "A" + this.htCore.radius + "," + this.htCore.radius + " "+ 
                    "0 0,1 "+
                    this.htCore.startX + ","+
                    this.htCore.startY + " "+
                    "L" + this.htCore.centerX + "," + this.htCore.centerY + " "+
                    "Z";
      return _result;
    },

     /* var segments = el.pathSegList;
      * Move : x,y ------> segments.getItem(0);
      * ARC : r1, r2, angle, largeArcFlag, sweepFlag, x, y ----->  segments.getItem(1);
      * LINE : x,y  ------> segments.getItem(2);
      */
    _setDataForSet : function(nIndex) {
        var aSegments = [];
        aSegments[nIndex] = this.aElPath[nIndex].pathSegList;
        this._aArc[nIndex] = aSegments[nIndex].getItem(1);
        this._aStart[nIndex] = aSegments[nIndex].getItem(0);
    },

    _makeCreatePathElement : function(){ 
        var nPathCount = this.aPiece.length;
        for(var i=0; i<nPathCount; i++) {
          this._createPathElements(i);
          this._setDataForSet(i);
        }
    },

    runAnimation : function() {
      this.animationId = window.requestAnimationFrame(this._runAnimation.bind(this));
    },

    _runAnimation : function() {
        this._nR = 0;
        var _ma = this.htCore.nMaxAngle;
        var _ic = this.htCore.nIncrease;

        //condition of stop ANIMATION
        if(this.nCount >= FXDATA.maxAngle) {
          this._showTextData();
          this._addShadow();
          return;
        }

        //Increase 만큼 증가
        this.nCount = this.nCount + _ic;

        //최대값을 보정한다.
        if(this.nCount > (_ma - _ic)) this.nCount = FXDATA.maxAngle;

        //TODO. aPiece의 [0]의 값이 100% 비율로 맞춰진 상태로 넘겨야 한다. 
        this.aPiece.forEach(this._setSVGPathAttribute.bind(this));

        window.requestAnimationFrame(this._runAnimation.bind(this));
    },

    _setSVGPathAttribute : function(v,i,o) {

        var _r = this.htCore.radius;
        var _sx = this.htCore.startX;
        var _sy = this.htCore.startY;

        if(i > 0) {
          this._aStart[i].x = this._aArc[i-1].x;
          this._aStart[i].y = this._aArc[i-1].y;
        }

        //calculate piece Range
        var _nPieceRange = this.nCount * v[0] / 100;
        this._nR += _nPieceRange;

        //set end Point
        this._aArc[i].x = (_sx - _r) + (+(Math.cos(Math.PI/180 * this._nR))) * _r;
        this._aArc[i].y = (_sy) + (+(Math.sin(Math.PI/180 * this._nR))) * _r;

        //change flag (if 180 degree)
        if((_nPieceRange) >= 180 && !this._aArc[i].largeArcFlag) this._aArc[i].largeArcFlag = 1;

        return this._nR; //for Array.map
    },

    _showTextData : function() {

        var aGcenterPos = [];
        var _ta;
        var _caledPy = 0.01745329251; // (Math.PI / 180)
        var _r = this.htCore.radius;
        var _cx = this.htCore.centerX;
        var _cy = this.htCore.centerY;

        var aGangles = this.aPiece.map(this._setSVGPathAttribute.bind(this));
        var _al = aGangles.length;

        //append to array value of Center piece angle.
        for(var i = 0; i< _al; i++) {

            //calculate center angle (_ta)
            if(i === 0 ) _ta = Math.floor(aGangles[0]/2);
            else _ta = Math.floor((aGangles[i] - aGangles[i-1])/2 + aGangles[i-1]);

            //원의 원점을 기준으로 x,y 좌표를 설정한다. 원의 중심이 (0,0) 이다.
            var _tx = (Math.cos(_caledPy * _ta)) * _r;
            var _ty = (Math.sin(_caledPy * _ta)) * _r;

            //실제 svg기준 좌표를 설정한다.
            _tx = _cx + (_tx/2);
            _ty = _cy + (_ty/2);

            _appendText.apply(this,[i+1,_tx,_ty]);
        }

        //add text
        //var p = this.aElPath[nIndex];
        //todo. 이거 계속 바껴야 함...
        function _appendText(index,x,y) {
            var t = document.createElementNS(FXDATA.xmlns, "text");
            var elGs = this.elParentSVG.querySelector("g:nth-child("+index+")");

            var b = elGs.getBBox();
            //'15' is adjusted data for postion center.
            t.setAttribute("transform", "translate(" + (x-15) + " " + y + ")");
            t.textContent = "12%";
            t.setAttribute("fill", "#000");
            t.setAttribute("font-size", "14");
            elGs.appendChild(t);
        }
    },

    _addShadow : function() {
        this.elParentSVG.style.webkitFilter = CSS.chartShadow;
        this.elParentSVG.style.filter = CSS.chartShadow;
    },

    _resetAnimation : function() {
        //this.nCount = 0;
        //this._aArc[0].largeArcFlag = 0;
        if(this.animationId) {
          window.cancelAnimationFrame(requestId);
          this.animationId = undefined;
        } 
    },

    reStartAnimation : function() {
        this._resetAnimation();
        this.runAnimation();
    },
    constructor : PIE,
  };
  return PIE;
}());

//support Require
if (typeof define === "function" && define.amd) {
    define("ac_pie", [], function() {
        return ANICHART_PIE;
    });
}
