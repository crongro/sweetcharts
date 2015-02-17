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
            centerX:100, centerY:100, radius:50, nMaxAngle:360, nMilliSecondCycle : 1000, nIncrease:5, colorType : "A"
      },
      CSS : {
        chartShadow : "drop-shadow(4px 5px 2.2px rgba(0,0,0,0.25))",

        /**
         * URL : http://www.google.com/design/spec/style/color.html#color-color-palette
         * get css method
            (function(num) {
              var list = document.querySelectorAll(".color-group ul li:nth-child("+num+") span:last-child");
              var alist = Array.prototype.slice.call(list);
              return alist.map(function(v,i,o){
                      return v.innerText;
                     });
            })(11);

            //a:100, b:a100, c:500, d: http://colrd.com/palette/19308/ 
         */

        colorTypeA : ['#ffcdd2', '#f8bbd0', '#e1bee7', '#d1c4e9', '#c5cae9', '#bbdefb', '#b3e5fc', '#b2ebf2','#b2dfdb',
                  '#c8e6c9', '#dcedc8', '#f0f4c3', '#fff9c4', '#ffecb3', '#ffe0b2', '#ffccbc', '#d7ccc8', '#f5f5f5', '#cfd8dc'],
        colorTypeB : ["#FF8A80", "#FF80AB", "#EA80FC", "#B388FF", "#8C9EFF", "#82B1FF", "#80D8FF", "#84FFFF", "#A7FFEB",
                   "#B9F6CA", "#CCFF90", "#F4FF81", "#FFFF8D", "#FFE57F", "#FFD180", "#FF9E80"],
        colorTypeC : ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688',
                  '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b'],
        colorTypeD : ['#51574a', '#447c69', '#74c493', '#8e8c6d', '#e4bf80', '#e9d78e', '#e2975d', '#f19670', '#e16552',
                  '#c94a53', '#be5168', '#a34974', '#993767', '#65387d', '#4e2472', '#9163b6', '#e279a3', '#e0598b', '#7c9fb0','#5698c4','#9abf88']
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
      this.aColorSet = [];

      //set options
      try {this._setOption(htOption);} catch(errMsg){console.error(errMsg);}

      //set center position
      this.htCore.startX = this.htCore.centerX + this.htCore.radius;
      this.htCore.startY = this.htCore.centerY;

      //set color random array 
      //this.aColorSet = this._getRandomIndex(this.aPiece.length, FXDATA.CSS.colors.length-1);
      this.aColorSet = this._getRandomIndex(FXDATA.CSS[this.htCore.colorType].length-1, this.aPiece.length);
      console.log("this.aColorSet -> ", this.aColorSet);

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
          if(typeof pre!== "number") pre = +pre; 
          return pre + now;
        });
        this.aPiece.forEach(function(v,i,o) {
          this.aPiece[i] = +(((v/_nSumPiece)*100).toFixed(2));
        }.bind(this));

        for(var name in FXDATA.htDefaultCoreValue) {
          this.htCore[name] = htCoreOption[name] || FXDATA.htDefaultCoreValue[name];
        }

        this.htCore.colorType = "colorType" + this.htCore.colorType.toUpperCase();
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
        this.aElPath[nIndex].setAttribute("style" , "stroke:white;fill:"+ FXDATA.CSS[this.htCore.colorType][this.aColorSet[nIndex]]);
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

    _getRandomIndex : function(nRandomRange, nNeedCount) {
        var _arr = [];
        while(_arr.length < nNeedCount) {
          var _ranValue = Math.round(Math.random() * nRandomRange);
          if(_arr.length > nRandomRange) _arr.push(_ranValue);
          else if(_arr.indexOf(_ranValue) < 0) _arr.push(_ranValue);
          else continue;
        }
        return _arr;
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
        var _nPieceRange = this.nCount * v / 100;
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
            if(i === 0 ) _ta = Math.round(aGangles[0]/2);
            else _ta = Math.round((aGangles[i] - aGangles[i-1])/2 + aGangles[i-1]);

            //원의 원점을 기준으로 x,y 좌표를 설정한다. 원의 중심이 (0,0) 이다.
            var _tx = (Math.cos(_caledPy * _ta)) * _r;
            var _ty = (Math.sin(_caledPy * _ta)) * _r;

            //실제 svg기준 좌표를 설정한다.
            // _tx = _cx + (_tx/2);
            // _ty = _cy + (_ty/2);
            _tx = _cx + (_tx/1.6); //값이 작을수록 원점과 멀어진다.
            _ty = _cy + (_ty/1.6);

            _appendText.apply(this,[i,_tx,_ty]);
        }

        //add text
        //var p = this.aElPath[nIndex];
        //todo. 이거 계속 바껴야 함...
        function _appendText(index,x,y) {
            var t = document.createElementNS(FXDATA.xmlns, "text");
            var elGs = this.elParentSVG.querySelector("g:nth-child("+(index+1)+")");

            var b = elGs.getBBox();
            var _nPercentRatio = +(this.aPiece[index].toFixed(1));
            var _nPercentFontIncreaseSize =  Math.round(this.aPiece[index] * 0.40); //font-size range is 10~50(40)

            //'2.5' is adjusted data for postion center.
            t.setAttribute("transform", "translate(" + (x - _nPercentFontIncreaseSize*3.0) + " " + y + ")");
            t.textContent = (_nPercentRatio % 1 === 0) ? _nPercentRatio.toFixed(0)+"%" : _nPercentRatio+"%";
            //t.setAttribute("fill", (this.htCore.colorType === "colorTypeE" || this.htCore.colorType === "colorTypeD") ? "#fff" : "#000");
            t.setAttribute("fill","#000");
            t.setAttribute("font-size", 8 + _nPercentFontIncreaseSize + ""); //10 is default font-size(minimum-size)
            elGs.appendChild(t);
        }
    },

    _addShadow : function() {
        var _v = FXDATA.CSS.chartShadow;
        this.elParentSVG.style.webkitFilter = _v;
        this.elParentSVG.style.filter = _v;
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
