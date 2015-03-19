/**
 * LEGEND-MANAGER 
 * @author [nigayo]
 */

var LegendManager = (function() {

    var FXDATA = {
        xmlns               : "http://www.w3.org/2000/svg",
    };

    function LegendManager(elParentDiv, aName, aColor) {
        this.elLegendSVG = elParentDiv.querySelector(".ani-legend");
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
                var nPlusValue = this.nFirstElementTop + i*this.htData.nGap;
                this.createElement(v,this.aColor[i],nPlusValue);
            }, this);
        },
        createElement : function(sName,sColor,nPlusValue) {
            var p = this.elLegendSVG;
            var g = document.createElementNS(FXDATA.xmlns, "g");
            var r = document.createElementNS(FXDATA.xmlns, "rect");
            var t = document.createElementNS(FXDATA.xmlns, "text");

            u.setAttrs(r, {
                "x"       : "10",
                "y"       : nPlusValue,
                "width"   : this.htData.nSize,
                "height"  : this.htData.nSize,
                "fill"    : sColor,
            });

            u.setAttrs(t, {
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
          this.aElText = Array.prototype.slice.call(this.elLegendSVG.querySelectorAll("g > text"));
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

    return LegendManager;
})();
