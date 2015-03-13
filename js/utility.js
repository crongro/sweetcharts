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
};