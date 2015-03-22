/**
 * 
 * SWEETCHARTS. PIE-CHART
 * 
 * MIT license
 * @author [nigayo]
 * Send me an email : aniga75@gmail.com
 */


/*jslint browser: true*/ 
"use strict";

var SWEETCHARTS = SWEETCHARTS || {};

SWEETCHARTS.PIE = (function(window, document, polyfill, u, LegendManager) {

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

  function PIE(elTarget, htOption) {

      polyfill.exec();

      if(!(htOption && typeof htOption === "object")) {
          if(window.console) window.console.error(FXDATA.sErrorMSG.OPTION_TYPE_ERROR);
          return null;
       }
      this.nCount       = 0;
      this.aElPath      = [];
      this.aArc         = [];
      this.aStart       = [];
      this.elWrapDiv    = elTarget;
      this.elChartSVG   = elTarget.querySelector(".sweet-chart");
      this.elMaxValuePath = null;
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
      this.bDonutChart  = this.bDonutChart || false;
      this.bShadow      = !this.bDonutChart;
      this.bMobile      = u.isMobile();

      console.log("3", u.isMobile());
      //set options
      try {this.setOption(htOption);} catch(errMsg){window.console.error(errMsg);}

      //set center position
      this.htCore.startX = this.htCore.centerX + this.htCore.radius;
      this.htCore.startY = this.htCore.centerY;

      this.makeCreatePathElement();
  }

  PIE.prototype = {
    setOption : function(htOption) {

        var htCoreOption  = htOption.core;
        this.htPiece      = htOption.htPiece;
        this.aPieceKeys   = Object.keys(this.htPiece);
        this.aPieceValue  = this.aPieceKeys.map(function(v){return this.htPiece[v].data;}, this);

        //check. piece count
        if(this.aPieceValue.length < FXDATA.minPieceCount) throw Error(FXDATA.sErrorMSG.REQ_PIECE_DATA);

        //piece option recalculate : to % ratio
        var nSumPiece = this.aPieceValue.reduce(function(pre,now,i,o){
          if(typeof pre!== "number") pre = +pre; 
          return pre + now;
        });

        this.aPieceValue.forEach(function(v,i,o) {
          this.aPieceValue[i] = Number(((v/nSumPiece)*100).toFixed(2));
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
            this.aColorSet    = this.getRandomColorArray(this.htCore.sRandomColorType.toLowerCase(), this.aPieceValue.length);
        } else {
            this.aColorSet    = this.aPieceKeys.map(function(v){return this.htPiece[v].color;}, this);
        }

        //100 is piece animation time(adjusted value)
        this.htCore.nIncrease = (FXDATA.nAniTime * 360) / (htCoreOption.nMilliSecondCycle - 100);
    },
    getRandomColorArray : function(sRandomColorType, nPieceLen) {
        var aRandomIndex  = u.getRandomIndex(FXDATA.colorType[sRandomColorType].length-1, nPieceLen);
        var aColorSet     = aRandomIndex.map(function(v){
          return FXDATA.colorType[sRandomColorType][v];
        });
        return  aColorSet;
    },
    createPathElements : function (aPath, nIndex, sCoords, sColor, bDonut) {
        var g = document.createElementNS(FXDATA.xmlns, "g");

        this.elChartSVG.appendChild(g);

        aPath[nIndex] = document.createElementNS(FXDATA.xmlns, "path");

        var sIDName = (bDonut) ? "InnerPath" : "elPath";

        u.setAttrs(aPath[nIndex], {
            "class"    : sIDName + nIndex,
            "d"     : sCoords,
            "style" : "stroke:white;fill:"+ sColor,
        });

        g.appendChild(aPath[nIndex]);
    },
    getCoordProperty : function(startX, startY, endX, endY, radius,centerX,centerY) {
      var result = "M " + startX + " " + startY + " "+ 
                    "A " + radius + " " + radius + " "+ 
                    "0 0 1 "+
                    endX + " "+
                    endY + " "+
                    "L " + centerX + " " + centerY + " "+
                    "Z";
      return result;
    },

     /* var segments = el.pathSegList;
      * Move : x,y ------> segments.getItem(0);
      * ARC : r1, r2, angle, largeArcFlag, sweepFlag, x, y ----->  segments.getItem(1);
      * LINE : x,y  ------> segments.getItem(2);
      */
    setDataForSet : function(nIndex) {
        var aSegments = [];
        aSegments[nIndex] = this.aElPath[nIndex].pathSegList;
        this.aArc[nIndex] = aSegments[nIndex].getItem(1);
        this.aStart[nIndex] = aSegments[nIndex].getItem(0);
    },

    makeCreatePathElement : function(){ 
        var nPathCount = this.aPieceValue.length;
        var d = this.htCore;
        var sCoords = this.getCoordProperty(d.startX,d.startY,d.startX,d.startY,d.radius,d.centerX,d.centerY);

        for(var i=0; i<nPathCount; i++) {
          this.createPathElements(this.aElPath, i, sCoords, this.aColorSet[i]);
          this.setDataForSet(i);
        }

        if(this.bDonutChart) this.makeCircle();
    },
    runAnimation : function() {
        this.nR = 0;
        var ma = this.htCore.nMaxAngle;
        var ic = this.htCore.nIncrease;

        //condition of stop ANIMATION
        if(this.nCount >= FXDATA.maxAngle) {
          this.execAfterAnimation();
          return;
        }

        this.nCount = this.nCount + ic;

        //revise maximum value 
        if(this.nCount > (ma - ic)) this.nCount = FXDATA.maxAngle;

        this.aPieceValue.forEach(this.setSVGPathAttribute, this);

        window.requestAnimationFrame(this.runAnimation.bind(this));
    },
    execAfterAnimation : function() {
        this.showTextData();
        if(this.bShadow) this.addShadow();

        this.oLegend = new LegendManager(this.elWrapDiv, this.aPieceKeys, this.aColorSet);
        this.oLegend.makeLegend();

        this.registerOverEffect();

        //fire piece animation
        this.elMaxValuePath = this.aElPath[this.aPieceValue.indexOf(Math.max.apply(null, this.aPieceValue))];
        window.setTimeout(function(){ this.overHandler({"target" : this.elMaxValuePath});}.bind(this), 200);

        if(this.bDonutChart) this.execDonutAfterProcess();
    },
    registerOverEffect : function() {
        var sEventType = this.getEventType();
        this.elChartSVG.addEventListener(sEventType, this.overHandler.bind(this));
        this.elChartSVG.addEventListener("mousemove", this.moveHandler.bind(this));
    },
    getEventType : function() {
        if(this.bMobile) return "touchstart";
        return "mouseover";
    },
    moveHandler :  function(e) {
        if(e.target.nodeName !== "svg" || !this.elOver) return;

        var nDistance = u.getDistanceFromCircleCenter(e, this.htCore);
        if(nDistance < this.htCore.radius) return;
        if(this.elOver) {
             if(this.oLegend) this.oLegend.clearEmphasizeMenu();
            this.rollback();
        }
    },
    overHandler : function(e) {
        console.log('overHandler', e.type);
        var elCurName = e.target.nodeName;

        //from text to path
        if(elCurName === "path" && e.relatedTarget && e.relatedTarget.nodeName === "text") return;

        if(e.type === "mouseover" && elCurName === "text") return;

        //Donut
        if(e.target.className.baseVal.lastIndexOf("In",0)===0) return;

        var elCur = (elCurName === "text") ? e.target.previousSibling : e.target;

        if((elCurName !== "path" && elCurName !== "text") ) {
            var nDistance = u.getDistanceFromCircleCenter(e, this.htCore);
            if(nDistance > this.htCore.radius && this.elOver) {
                if(this.oLegend) this.oLegend.clearEmphasizeMenu();
                this.rollback();
            }
            return;
        } 

        //when enter into other Piece
        if(this.elOver && this.elOver !== elCur) this.rollback();

        //before animation moving, should be cancel all animationframe
        this.cancelAllAnimationFrame();

        //above all logic is async.
        this.movePiece(elCur, this.htTextPos[elCur.className.baseVal].x,this.htTextPos[elCur.className.baseVal].y, 30);

        //emphasize Legend match menu.
        var nIndex = Number(elCur.className.baseVal.substr(6)); //6 is count of word('elPath')
        this.oLegend.emphasizeMenu(nIndex);

        //change center text on Donut.
        if(this.bDonutChart) this.changeCenterTextMessage(this.aPieceKeys[nIndex]);

        this.elOver = elCur;
    },
    rollback : function() {
        this.cancelAllAnimationFrame();
        u.setAttrs(this.elOver, {"transform":"translate(0,0)"});
        u.setAttrs(this.elOver.nextElementSibling, {"transform":"translate("+this.htTextPos[this.elOver.className.baseVal].x+","+this.htTextPos[this.elOver.className.baseVal].y+")"});

        if(this.bDonutChart) { 
          var elDonutPiece = this.elChartSVG.querySelector(".InnerPath" + (Number(this.elOver.className.baseVal.substr(6))));
          u.setAttrs(elDonutPiece, {"transform":"translate(0,0)"});
        }

        this.elOver = null;
    },
    cancelAllAnimationFrame : function() {
        for(var value in this.htReq) {window.cancelAnimationFrame(this.htReq[value]);}
    },
    movePiece : function(elCur, nTx, nTy, nSize) {
        var aPos, nSlope, nXdirection, nYdirection, nXPos;
        
        aPos = this.htPathOutlinePos[elCur.className.baseVal];
        nSlope = Math.abs(aPos[1] / aPos[0]); // slope = y/x
        nXdirection = aPos[0] / Math.abs(aPos[0]);
        nYdirection = aPos[1] / Math.abs(aPos[1]);
        nXPos = Math.sqrt(nSize / (Math.pow(nSlope,2)+1));

        elCur.setAttribute("transform", "translate(" + (nXPos*nXdirection) + "," + (nXPos*nSlope*nYdirection) + ")");
        //move text element
        elCur.nextElementSibling.setAttribute("transform", "translate(" + (nTx+(nXPos*nXdirection)) + "," + (nTy+(nXPos*nSlope*nYdirection)) + ")");

        //when donut, move a InnerPath element.
        if(this.bDonutChart) {
          var elDonutPiece = this.elChartSVG.querySelector(".InnerPath" + (Number(elCur.className.baseVal.substr(6))));
          elDonutPiece.setAttribute("transform", "translate(" + (nXPos*nXdirection) + "," + (nXPos*nSlope*nYdirection) + ")");
        }

        nSize+=20; //increase size

        if (nSize < 300) { 
          this.reqId = window.requestAnimationFrame(this.movePiece.bind(this,elCur,nTx, nTy, nSize));
          this.htReq[elCur.className.baseVal] = this.reqId;
        } else {
          //movepiece after calback
        }
    },
    setSVGPathAttribute : function(v,i,o) {

        var r = this.htCore.radius;
        var sx = this.htCore.startX;
        var sy = this.htCore.startY;

        if(i > 0) {
          this.aStart[i].x = this.aArc[i-1].x;
          this.aStart[i].y = this.aArc[i-1].y;
        }

        //calculate piece Range
        var nPieceRange = this.nCount * v / 100;
        this.nR += nPieceRange;

        //set end Point
        this.aArc[i].x = (sx - r) + (Number(Math.cos(Math.PI/180 * this.nR))) * r;
        this.aArc[i].y = (sy) + (Number(Math.sin(Math.PI/180 * this.nR))) * r;

        //change flag (if 180 degree)
        if((nPieceRange) >= 180 && !this.aArc[i].largeArcFlag) this.aArc[i].largeArcFlag = 1;

        return this.nR; //for Array.map
    },
    showTextData : function() {
        var nDistanceFromCenter = (this.bDonutChart) ? 1.3 : 1.6;
        var aAngles = this.aPieceValue.map(this.setSVGPathAttribute, this);
        //append to array value of Center piece angle.
        for(var i = 0, al=aAngles.length; i< al; i++) {
            var oPos = u.getPosition(aAngles, this.htCore, i, this.pushCenterPosition.bind(this), nDistanceFromCenter);
            this.appendDataInText(i, oPos.x , oPos.y);
        }
    },
    pushCenterPosition : function(nX, nY, nIndex) {
        this.htPathOutlinePos["elPath"+nIndex] = [nX, nY];
    },
    appendDataInText : function(index,x,y) {
        var t = document.createElementNS(FXDATA.xmlns, "text");
        var elGs = this.elChartSVG.querySelector("g:nth-of-type("+(index+1)+")");

        var nPercentRatio = Number(this.aPieceValue[index].toFixed(1));
        var nPercentFontIncreaseSize =  Math.round(this.aPieceValue[index] * 0.40); //font-size range is 10~50(40)

        var xResult = x - nPercentFontIncreaseSize*2.0; // a '2.0' is adjusted data for postion center.

        u.setAttrs(t, {
            "transform" : "translate(" + xResult + " " + y + ")",
            "fill"      : "#000",
            "font-size" : 8 + nPercentFontIncreaseSize + "", //'8' is default font-size(minimum-size)
        });

        t.textContent = (nPercentRatio % 1 === 0) ? nPercentRatio.toFixed(0)+"%" : nPercentRatio+"%";
        elGs.appendChild(t);

        //save text position info
        this.htTextPos[elGs.firstElementChild.className.baseVal] = { "x" : xResult , "y" : y};
    },
    addShadow : function() {
        var v = FXDATA.CSS.chartShadow;
        this.elChartSVG.style.webkitFilter = v;
        this.elChartSVG.style.filter = v;
    },
    constructor : PIE,
  };

  return PIE;
}(window, document, SWEETCHARTS.polyfill, SWEETCHARTS.u, SWEETCHARTS.LegendManager));

//support Require
if (typeof window.define === "function" && window.define.amd) {
    window.define(["sweet_pie.min"], function() {
        return SWEETCHARTS.PIE;
    });
}