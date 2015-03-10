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
            //centerX:0, centerY:0, radius:50, nMaxAngle:360, nMilliSecondCycle: 1000, nIncrease:5, sRandomColorType: ""
            radius:50, nMaxAngle:360, nMilliSecondCycle: 1000, nIncrease:5, sRandomColorType: ""
      },
      CSS : {
        chartShadow : "drop-shadow(4px 5px 2.2px rgba(0,0,0,0.25))",
      },
      colorType : {
        //TODO . Object 형태로..
        a : ['#ffcdd2', '#f8bbd0', '#e1bee7', '#d1c4e9', '#c5cae9', '#bbdefb', '#b3e5fc', '#b2ebf2','#b2dfdb',
                  '#c8e6c9', '#dcedc8', '#f0f4c3', '#fff9c4', '#ffecb3', '#ffe0b2', '#ffccbc', '#d7ccc8', '#f5f5f5', '#cfd8dc'],
        b : ["#FF8A80", "#FF80AB", "#EA80FC", "#B388FF", "#8C9EFF", "#82B1FF", "#80D8FF", "#84FFFF", "#A7FFEB",
                   "#B9F6CA", "#CCFF90", "#F4FF81", "#FFFF8D", "#FFE57F", "#FFD180", "#FF9E80"],
        c : ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688',
                  '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b'],
        d : ['#51574a', '#447c69', '#74c493', '#8e8c6d', '#e4bf80', '#e9d78e', '#e2975d', '#f19670', '#e16552',
                  '#c94a53', '#be5168', '#a34974', '#993767', '#65387d', '#4e2472', '#9163b6', '#e279a3', '#e0598b', '#7c9fb0','#5698c4','#9abf88']
      }
  };

  var _polyfill = {
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
              window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
              || window[vendors[x]+'CancelRequestAnimationFrame'];
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
                clearTimeout(id);
              };
      },
  }

  //Utility
  var _u = {
      setAttrs : function(elBase, htData) {
          for(var sKey in htData) {
              if(htData.hasOwnProperty(sKey)) {
                  elBase.setAttribute(sKey, htData[sKey]);
              }
          }
      },
      getDistanceFromCircleCenter : function(e, htCore) {
          var _x = (e.offsetX) ? e.offsetX : (e.layerX - (e.target.parentElement.offsetLeft));
          var _y = (e.offsetY) ? e.offsetY : (e.layerY - (e.target.parentElement.offsetTop));
          var nDistance = Math.sqrt(Math.pow(htCore.centerX - _x, 2) + Math.pow(htCore.centerY - _y, 2));
          return nDistance;
      },
      getRandomIndex : function(nRandomRange, nNeedCount) {
        var _arr = [];
        while(_arr.length < nNeedCount) {
          var _ranValue = Math.round(Math.random() * nRandomRange);
          if(_arr.length > nRandomRange) _arr.push(_ranValue);
          else if(_arr.indexOf(_ranValue) < 0) _arr.push(_ranValue);
          else continue;
        }
        return _arr;
      },
      getPosition : function(aAngles,htCore, i, fCallback) {
          var _ta;
          var _caledPy = 0.01745329251; // (Math.PI / 180)
          var _r = htCore.radius;
          var _cx = htCore.centerX;
          var _cy = htCore.centerY;

          //calculate center angle (_ta)
          if(i === 0 ) _ta = Math.round(aAngles[0]/2);
          else _ta = Math.round((aAngles[i] - aAngles[i-1])/2 + aAngles[i-1]);

          //set x,y position to the circle center
          var _tx = (Math.cos(_caledPy * _ta)) * _r;
          var _ty = (Math.sin(_caledPy * _ta)) * _r;

          fCallback(_tx, _ty, i);

          //set x,y position to the SVG Element
          _tx = _cx + (_tx/1.6); // the smaller the value away from the center point.
          _ty = _cy + (_ty/1.6);

          return { "x" : _tx, "y" : _ty};
      },
      getRandomColorArray : function(sRandomColorType, nPieceLen) {
            var aRandomIndex  = _u.getRandomIndex(FXDATA.colorType[sRandomColorType].length-1, nPieceLen);
            var aColorSet     = aRandomIndex.map(function(v){
                                  return FXDATA.colorType[sRandomColorType][v];
                                });
            return  aColorSet;
      }
  };

  function PIE(elTarget, htOption) {

      _polyfill.exec();

      if(!(htOption && typeof htOption === "object")) {
          if(window.console) console.error(FXDATA.sErrorMSG.OPTION_TYPE_ERROR);
          return null;
       }
      this.nCount       = 0;
      this.aElPath      = [];
      this._aArc        = [];
      this._aStart      = [];
      this.elParentSVG  = elTarget;
      this.elWrapDiv    = elTarget.parentNode;
      this.htCore       = {};
      this.aPieceKeys   = [];
      this.aPieceValue  = [];
      this.aColorSet    = null; 
      this.htPathOutlinePos = {};
      this.elOver       = null;
      this.reqId        = null;
      this.htReq        = {};
      this.htTextPos    = {};
      this.oLegend      = null;

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
        this.htPiece      = htOption.htPiece;
        this.aPieceKeys   = Object.keys(this.htPiece);
        this.aPieceValue  = this.aPieceKeys.map(function(v){return this.htPiece[v].data;}, this);

        //check. piece count
        if(this.aPieceValue.length < FXDATA.minPieceCount) throw Error(FXDATA.sErrorMSG.REQ_PIECE_DATA);

        //piece option recalculate : to % ratio
        var _nSumPiece = this.aPieceValue.reduce(function(pre,now,i,o){
          if(typeof pre!== "number") pre = +pre; 
          return pre + now;
        });

        this.aPieceValue.forEach(function(v,i,o) {
          this.aPieceValue[i] = Number(((v/_nSumPiece)*100).toFixed(2));
        },this);

        //set default options
        for(var name in FXDATA.htDefaultCoreValue) {
          this.htCore[name] = htCoreOption[name] || FXDATA.htDefaultCoreValue[name];
        }

        //set center position
        this.htCore.centerX = htCoreOption.centerX || (this.elWrapDiv.clientWidth*0.7/2); //because of 70%
        this.htCore.centerY = htCoreOption.centerY || (this.elWrapDiv.clientHeight/2);

        //set color
        if(this.htCore.sRandomColorType.toLowerCase() in FXDATA.colorType) {
            this.aColorSet    = _u.getRandomColorArray(this.htCore.sRandomColorType.toLowerCase(), this.aPieceValue.length);
        } else {
            this.aColorSet    = this.aPieceKeys.map(function(v){return this.htPiece[v].color;}, this);
        }

        //100 is piece animation time(adjusted value)
        this.htCore.nIncrease = (FXDATA.nAniTime * 360) / (htCoreOption.nMilliSecondCycle - 100);
     },

    _createPathElements : function (nIndex) {
        var g = document.createElementNS(FXDATA.xmlns, "g");
        this.elParentSVG.appendChild(g);

        this.aElPath[nIndex] = document.createElementNS(FXDATA.xmlns, "path");

        var _coords = this._getCoordProperty();

        _u.setAttrs(this.aElPath[nIndex], {
            //"id"    : "elPath",
            "id"    : "elPath"+nIndex,
            "d"     : _coords,
            "style" : "stroke:white;fill:"+ this.aColorSet[nIndex],
        });

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
        var nPathCount = this.aPieceValue.length;

        for(var i=0; i<nPathCount; i++) {
          this._createPathElements(i);
          this._setDataForSet(i);
        }
    },

    runAnimation : function() {
        this._nR = 0;
        var _ma = this.htCore.nMaxAngle;
        var _ic = this.htCore.nIncrease;

        //condition of stop ANIMATION
        if(this.nCount >= FXDATA.maxAngle) {
          this._execAfterAnimation();
          return;
        }

        this.nCount = this.nCount + _ic;

        //revise maximum value 
        if(this.nCount > (_ma - _ic)) this.nCount = FXDATA.maxAngle;

        this.aPieceValue.forEach(this._setSVGPathAttribute, this);

        requestAnimationFrame(this.runAnimation.bind(this));
    },
    _execAfterAnimation : function() {
        this._showTextData();
        this._addShadow();

        this.oLegend = new LegendManager(this.elWrapDiv, this.aPieceKeys, this.aColorSet);
        this.oLegend.makeLegend();

        this._registerOverEffect();
    },
    _registerOverEffect : function() {
        this.elParentSVG.addEventListener("mouseover", this._overHandler.bind(this));
        this.elParentSVG.addEventListener("mousemove", this._moveHandler.bind(this));
    },
    _moveHandler :  function(e) {
        if(e.target.nodeName !== "svg" || !this.elOver) return;

        var nDistance = _u.getDistanceFromCircleCenter(e, this.htCore);
        if(nDistance < this.htCore.radius) return;
        if(this.elOver) {
             if(this.oLegend) this.oLegend.clearEmphasizeMenu();
            this.rollback();
        }
    },
    _overHandler : function(e) {
        var elCurName = e.target.nodeName;
        if(elCurName === "path" && e.relatedTarget && e.relatedTarget.nodeName === "text") return;
        var elCur = (elCurName === "text") ? e.target.previousSibling : e.target;

        if(elCurName !== "path" && elCurName !== "text") {
           console.log("elCurName" , elCurName);
            var nDistance = _u.getDistanceFromCircleCenter(e, this.htCore);
            if(nDistance > this.htCore.radius && this.elOver) {
                if(this.oLegend) this.oLegend.clearEmphasizeMenu();
                this.rollback();
            }
            return;
        } 

        if(this.elOver && this.elOver !== elCur) this.rollback();

        //before animation moving, should be cancel all animationframe
        this.cancelAllAnimationFrame();

        this.movePiece(elCur, this.htTextPos[elCur.id].x,this.htTextPos[elCur.id].y, 30);

        //emphasize Legend match menu.
        var nIndex = Number(elCur.id.substr(6)); //6 is count of word('elPath')
        this.oLegend.emphasizeMenu(nIndex);

        this.elOver = elCur;
    },
    rollback : function() {
        this.cancelAllAnimationFrame();
        _u.setAttrs(this.elOver, {"transform":"translate(0,0)"});
        _u.setAttrs(this.elOver.nextElementSibling, {"transform":"translate("+this.htTextPos[this.elOver.id].x+","+this.htTextPos[this.elOver.id].y+")"});
        this.elOver = null;
    },
    cancelAllAnimationFrame : function() {
        for(var value in this.htReq) {cancelAnimationFrame(this.htReq[value]);}
    },
    movePiece : function(elCur, nTx, nTy, nSize) {
        var aPos, nSlope, nXdirection, nYdirection, nXPos,_id;
        
        aPos = this.htPathOutlinePos[elCur.id];
        nSlope = Math.abs(aPos[1] / aPos[0]); // slope = y/x
        nXdirection = (aPos[0] > 0) ? 1 : -1;
        nYdirection = (aPos[1] > 0) ? 1 : -1;
        nXPos = Math.sqrt(nSize / (Math.pow(nSlope,2)+1));

        elCur.setAttribute("transform", "translate(" + (nXPos*nXdirection) + "," + (nXPos*nSlope*nYdirection) + ")");

        //move text element
        elCur.nextElementSibling.setAttribute("transform", "translate(" + (nTx+(nXPos*nXdirection)) + "," + (nTy+(nXPos*nSlope*nYdirection)) + ")");

        nSize+=20; //increase size

        if(nSize < 300) { 
          this.reqId = requestAnimationFrame(this.movePiece.bind(this,elCur,nTx, nTy, nSize));
          this.htReq[elCur.id] = this.reqId;
        }
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
        this._aArc[i].x = (_sx - _r) + (Number(Math.cos(Math.PI/180 * this._nR))) * _r;
        this._aArc[i].y = (_sy) + (Number(Math.sin(Math.PI/180 * this._nR))) * _r;

        //change flag (if 180 degree)
        if((_nPieceRange) >= 180 && !this._aArc[i].largeArcFlag) this._aArc[i].largeArcFlag = 1;

        return this._nR; //for Array.map
    },

    _showTextData : function() {
        var aAngles = this.aPieceValue.map(this._setSVGPathAttribute, this);
        //append to array value of Center piece angle.
        for(var i = 0, _al=aAngles.length; i< _al; i++) {
            var oPos = _u.getPosition(aAngles, this.htCore, i, this._pushCenterPosition.bind(this));
            this._appendText(i, oPos.x , oPos.y);
        }
    },

    _pushCenterPosition : function(nX, nY, nIndex) {
        var elCurrent = this.elParentSVG.querySelector("#elPath"+nIndex);
        this.htPathOutlinePos["elPath"+nIndex] = [nX, nY];
    },

    _appendText : function(index,x,y) {
        var t = document.createElementNS(FXDATA.xmlns, "text");
        var elGs = this.elParentSVG.querySelector("g:nth-child("+(index+1)+")");

        var b = elGs.getBBox();
        var _nPercentRatio = Number(this.aPieceValue[index].toFixed(1));
        var _nPercentFontIncreaseSize =  Math.round(this.aPieceValue[index] * 0.40); //font-size range is 10~50(40)

        var xResult = x - _nPercentFontIncreaseSize*2.0; // a '2.0' is adjusted data for postion center.

        _u.setAttrs(t, {
            "transform" : "translate(" + xResult + " " + y + ")",
            "fill"      : "#000",
            "font-size" : 8 + _nPercentFontIncreaseSize + "", //a '8' is default font-size(minimum-size)
        });

        t.textContent = (_nPercentRatio % 1 === 0) ? _nPercentRatio.toFixed(0)+"%" : _nPercentRatio+"%";
        elGs.appendChild(t);

        //save text position info
        this.htTextPos[elGs.firstElementChild.id] = { "x" : xResult , "y" : y};
    },

    _addShadow : function() {
        var _v = FXDATA.CSS.chartShadow;
        this.elParentSVG.style.webkitFilter = _v;
        this.elParentSVG.style.filter = _v;
    },
    constructor : PIE,
  };

  //Legend CLASS
  function LegendManager(elParentDiv, aName, aColor) {
      this.elParentSVG = elParentDiv.querySelector("svg:nth-child(2)");
      this.nDivHeight = parseInt(elParentDiv.style.height);
      this.aName = aName;
      this.aColor = aColor;
      this.htData = {
        nGap  : 24, //line Height
        nSize : 16, //height and width
        nFontSize : 12
      };
      this.init();
  }

  LegendManager.prototype = {
      init : function() {

          //1. calculate all element's height.
          var o = this.htData;
          var nLegendHeight = o.nGap * this.aName.length - (o.nGap-o.nSize);
          if(this.nDivHeight <= nLegendHeight) console.error("Legend is too big");

          //2. decide first element position 
          this.nFirstElementTop = (this.nDivHeight - nLegendHeight) / 2;

      },
      makeLegend : function() {
          this.aName.forEach(function(v,i) {
              var _nPlusValue = this.nFirstElementTop + i*this.htData.nGap;
              this.createElement(v,this.aColor[i],_nPlusValue);
          }, this);
      },
      createElement : function(sName,sColor,nPlusValue) {
          var p = this.elParentSVG;
          var g = document.createElementNS(FXDATA.xmlns, "g");
          var r = document.createElementNS(FXDATA.xmlns, "rect");
          var t = document.createElementNS(FXDATA.xmlns, "text");

          _u.setAttrs(r, {
              "x"       : "10",
              "y"       : nPlusValue,
              "width"   : this.htData.nSize,
              "height"  : this.htData.nSize,
              "fill"    : sColor,
          });

          _u.setAttrs(t, {
              "x"         : "40",
              "y"         : nPlusValue+this.htData.nFontSize,
              "font-size" : this.htData.nFontSize,
              "fill"      : "#000",
          });

          t.textContent = sName;
          p.appendChild(g);
          g.appendChild(r);
          g.appendChild(t);
      },
      emphasizeMenu : function(nIndex) {
          this.aElText = Array.prototype.slice.call(this.elParentSVG.querySelectorAll("g > text"));
          var n = this.htData.nFontSize;
          this.aElText.forEach(function(v,i){
              if(nIndex === i) {
                  v.setAttribute("font-size", n * 1.3);
                  v.style.opacity = "1.0";
              } 
              else {
                  v.setAttribute("font-size",n);
                  v.style.opacity = "0.3";
              } 
          });
      },
      clearEmphasizeMenu : function() {
          var n = this.htData.nFontSize;
          this.aElText.forEach(function(v){
              v.setAttribute("font-size", n);
              v.style.opacity = "1.0";
          });
      },
      constructor : LegendManager
  };

  return PIE;
}());

//support Require
if (typeof define === "function" && define.amd) {
    define("ac_pie", [], function() {
        return ANICHART_PIE;
    });
}
